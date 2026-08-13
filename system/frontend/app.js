/**
 * HospedaTche - Frontend Application Architecture
 * Secure client-side application logic for hotel accommodation management.
 */

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Application State
const state = {
  token: localStorage.getItem('hospedatche_token') || null,
  user: JSON.parse(localStorage.getItem('hospedatche_user') || 'null'),
  currentView: 'home',
  rooms: [],
  bookings: [],
  selectedRoomForBooking: null,
  searchCriteria: null,
};

// Security Utility: Prevent XSS by escaping HTML special characters
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Toast Notifications
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Secure API Fetch Wrapper
async function apiFetch(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (state.token) {
    headers['Authorization'] = `Bearer ${state.token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      if (state.token) {
        logoutUser(false);
        showToast('Sua sessão expirou. Por favor, faça login novamente.', 'warning');
      }
    }

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `Erro HTTP ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// Auth Controller
function updateAuthState(user, token) {
  state.user = user;
  state.token = token;

  if (token && user) {
    localStorage.setItem('hospedatche_token', token);
    localStorage.setItem('hospedatche_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('hospedatche_token');
    localStorage.removeItem('hospedatche_user');
  }

  renderNavigation();
}

function logoutUser(notifyServer = true) {
  if (notifyServer && state.token) {
    apiFetch('/auth/logout', { method: 'POST' }).catch(() => {});
  }
  updateAuthState(null, null);
  showToast('Você saiu da sua conta.', 'info');
  switchView('home');
}

// Render Navigation & UI Visibility according to Role (RBAC)
function renderNavigation() {
  const roleBadge = document.getElementById('user-role-badge');
  const btnOpenLogin = document.getElementById('btn-open-login');
  const userDropdown = document.getElementById('user-dropdown');
  const userDisplayName = document.getElementById('user-display-name');

  const navBookings = document.getElementById('nav-bookings');
  const navStayOps = document.getElementById('nav-stay-ops');
  const navChatReviews = document.getElementById('nav-chat-reviews');
  const navReportsAudit = document.getElementById('nav-reports-audit');
  const navRoomsAdmin = document.getElementById('nav-rooms-admin');
  const navStaffAdmin = document.getElementById('nav-staff-admin');
  const navProfile = document.getElementById('nav-profile');

  [navBookings, navStayOps, navChatReviews, navReportsAudit, navRoomsAdmin, navStaffAdmin, navProfile].forEach((el) => {
    if (el) el.classList.add('hidden');
  });

  // Toggle Hero Banner Visibility (Only show for Guests and Visitors)
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    if (!state.user || state.user.role === 'Guest') {
      heroSection.classList.remove('hidden');
    } else {
      heroSection.classList.add('hidden');
    }
  }

  if (!state.user) {
    roleBadge.textContent = 'Visitante';
    roleBadge.className = 'badge badge-guest';
    btnOpenLogin.classList.remove('hidden');
    userDropdown.classList.add('hidden');
  } else {
    const role = state.user.role || 'Guest';
    roleBadge.textContent = translateRole(role);
    roleBadge.className = `badge badge-${role.toLowerCase()}`;

    btnOpenLogin.classList.add('hidden');
    userDropdown.classList.remove('hidden');
    userDisplayName.textContent = state.user.full_name || state.user.email;

    navProfile.classList.remove('hidden');

    if (role === 'Guest') {
      navBookings.classList.remove('hidden');
      navChatReviews.classList.remove('hidden');
    } else if (role === 'Receptionist') {
      navStayOps.classList.remove('hidden');
      navChatReviews.classList.remove('hidden');
      navRoomsAdmin.classList.remove('hidden');
    } else if (role === 'Manager') {
      navStayOps.classList.remove('hidden');
      navChatReviews.classList.remove('hidden');
      navReportsAudit.classList.remove('hidden');
      navRoomsAdmin.classList.remove('hidden');
    } else if (role === 'Administrator') {
      navReportsAudit.classList.remove('hidden');
      navStaffAdmin.classList.remove('hidden');
    }
  }
}

function translateRole(role) {
  const map = {
    Guest: 'Hóspede',
    Receptionist: 'Recepcionista',
    Manager: 'Gerente',
    Administrator: 'Administrador',
  };
  return map[role] || role;
}

// View Switcher
function switchView(viewName) {
  state.currentView = viewName;

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.view === viewName);
  });

  document.querySelectorAll('.view-panel').forEach((panel) => {
    panel.classList.toggle('hidden', panel.id !== `view-${viewName}`);
  });

  if (viewName === 'home') loadHomeReviews();
  else if (viewName === 'rooms') loadRooms();
  else if (viewName === 'bookings') loadBookings();
  else if (viewName === 'stay-ops') loadStayOps();
  else if (viewName === 'chat-reviews') loadChatReviews();
  else if (viewName === 'reports-audit') loadReportsAudit();
  else if (viewName === 'rooms-admin') loadRoomsAdmin();
  else if (viewName === 'profile') loadProfile();
}

// PAGE 1: Home Page Approved Reviews Loader
async function loadHomeReviews() {
  const box = document.getElementById('home-approved-reviews');
  if (!box) return;

  try {
    const data = await apiFetch('/reviews');
    const reviews = data.reviews || [];

    if (reviews.length === 0) {
      box.innerHTML = '<p class="text-muted" style="font-size:0.9rem;">Nenhuma avaliação cadastrada ainda.</p>';
      return;
    }

    box.innerHTML = reviews
      .map(
        (r) => `
        <div style="border-bottom:1px solid var(--border); padding:0.75rem 0;">
          <div><strong>${escapeHTML(r.guest_name)}</strong> <span style="color:var(--warning); margin-left:0.5rem;">${'⭐'.repeat(r.rating)}</span></div>
          <p style="font-size:0.9rem; margin-top:0.25rem; color:var(--text-muted);">${escapeHTML(r.comment)}</p>
        </div>
      `
      )
      .join('');
  } catch (err) {
    box.innerHTML = '<p class="text-muted">Não foi possível carregar as avaliações.</p>';
  }
}

// PAGE 2: Load and Display Available Rooms
async function loadRooms() {
  const grid = document.getElementById('rooms-grid');
  const title = document.getElementById('rooms-title');
  grid.innerHTML = '<div class="loading-spinner">Carregando acomodações...</div>';

  try {
    let endpoint = '/rooms';
    if (state.searchCriteria) {
      const params = new URLSearchParams(state.searchCriteria);
      endpoint = `/search/rooms?${params.toString()}`;
    }

    const data = await apiFetch(endpoint);
    state.rooms = data.rooms || [];

    if (state.searchCriteria) {
      title.textContent = `Acomodações Disponíveis (${state.searchCriteria.check_in} até ${state.searchCriteria.check_out})`;
    } else {
      title.textContent = 'Quartos Disponíveis';
    }

    renderRoomsGrid(grid, state.rooms);
  } catch (error) {
    grid.innerHTML = `<div class="empty-state">Erro ao carregar quartos: ${escapeHTML(error.message)}</div>`;
  }
}

function renderRoomsGrid(container, rooms) {
  if (!rooms || rooms.length === 0) {
    container.innerHTML = '<div class="empty-state">Nenhum quarto disponível encontrado para os critérios selecionados.</div>';
    return;
  }

  container.innerHTML = rooms
    .map((room) => `
      <div class="card room-card">
        <div class="room-card-header">
          <div>
            <div class="room-type">${escapeHTML(room.type)}</div>
            <div class="room-number">Quarto Nº ${escapeHTML(room.number)}</div>
          </div>
          <span class="badge badge-status-${escapeHTML(room.status)}">${room.status === 'available' ? 'Disponível' : escapeHTML(room.status)}</span>
        </div>
        <div class="room-details">
          <div>👥 Capacidade: <strong>${escapeHTML(room.capacity)} pessoas</strong></div>
          <div class="room-price">R$ ${Number(room.price_per_night).toFixed(2)} <span>/ noite</span></div>
        </div>
        <button class="btn btn-primary btn-full btn-book-room" data-id="${escapeHTML(room.id)}">
          ${state.user ? '🗓️ Reservar Agora' : '🔑 Entrar para Reservar'}
        </button>
      </div>
    `)
    .join('');

  container.querySelectorAll('.btn-book-room').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      openBookingModal(e.target.dataset.id);
    });
  });
}

// Booking Confirmation Modal
function openBookingModal(roomId) {
  if (!state.user) {
    openModal('modal-auth');
    showToast('Por favor, faça login para efetuar uma reserva.', 'info');
    return;
  }

  if (state.user.role !== 'Guest') {
    showToast('Apenas contas de Hóspede podem realizar reservas.', 'warning');
    return;
  }

  const room = state.rooms.find((r) => r.id === roomId);
  if (!room) return;

  state.selectedRoomForBooking = room;

  const today = new Date().toISOString().slice(0, 10);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().slice(0, 10);

  const checkInVal = state.searchCriteria?.check_in || today;
  const checkOutVal = state.searchCriteria?.check_out || tomorrow;

  const modalBody = document.getElementById('booking-modal-body');
  modalBody.innerHTML = `
    <div class="card" style="background:#f8fafc; margin-bottom:1rem;">
      <h4>Quarto Nº ${escapeHTML(room.number)} (${escapeHTML(room.type)})</h4>
      <p>Valor por noite: <strong>R$ ${Number(room.price_per_night).toFixed(2)}</strong></p>
    </div>
    <div class="form-group">
      <label for="modal-check-in">Data de Check-in</label>
      <input type="date" id="modal-check-in" class="form-input" value="${checkInVal}" required>
    </div>
    <div class="form-group">
      <label for="modal-check-out">Data de Check-out</label>
      <input type="date" id="modal-check-out" class="form-input" value="${checkOutVal}" required>
    </div>
    <div id="booking-summary" class="status-banner" style="margin-top:1rem;">
      Calculando valor total...
    </div>
  `;

  const calcSummary = () => {
    const cIn = document.getElementById('modal-check-in').value;
    const cOut = document.getElementById('modal-check-out').value;
    const summaryEl = document.getElementById('booking-summary');

    if (cIn && cOut && cIn < cOut) {
      const nights = (new Date(cOut) - new Date(cIn)) / (1000 * 60 * 60 * 24);
      const total = (nights * Number(room.price_per_night)).toFixed(2);
      summaryEl.innerHTML = `Noites: <strong>${nights}</strong> | Total a pagar: <strong style="color:var(--accent); font-size:1.1rem; margin-left:0.5rem;">R$ ${total}</strong>`;
      document.getElementById('btn-confirm-booking').disabled = false;
    } else {
      summaryEl.innerHTML = '<span style="color:var(--danger)">A data de check-out deve ser posterior ao check-in.</span>';
      document.getElementById('btn-confirm-booking').disabled = true;
    }
  };

  document.getElementById('modal-check-in').addEventListener('change', calcSummary);
  document.getElementById('modal-check-out').addEventListener('change', calcSummary);
  calcSummary();

  openModal('modal-booking');
}

async function handleConfirmBooking() {
  if (!state.selectedRoomForBooking) return;

  const checkIn = document.getElementById('modal-check-in').value;
  const checkOut = document.getElementById('modal-check-out').value;

  try {
    const data = await apiFetch('/bookings', {
      method: 'POST',
      body: JSON.stringify({
        room_id: state.selectedRoomForBooking.id,
        check_in: checkIn,
        check_out: checkOut,
      }),
    });

    closeModal('modal-booking');
    showToast('Reserva criada com sucesso! Realize o pagamento para confirmar.', 'success');
    switchView('bookings');
    openPaymentModal(data.booking);
  } catch (error) {
    showToast(`Erro na reserva: ${error.message}`, 'error');
  }
}

// PAGE 3: My Bookings & Payment
async function loadBookings() {
  const container = document.getElementById('bookings-list');
  container.innerHTML = '<div class="loading-spinner">Carregando suas reservas...</div>';

  try {
    const data = await apiFetch('/bookings');
    state.bookings = data.bookings || [];
    renderBookingsList(container, state.bookings);
  } catch (error) {
    container.innerHTML = `<div class="empty-state">Erro ao carregar reservas: ${escapeHTML(error.message)}</div>`;
  }
}

function renderBookingsList(container, bookings) {
  if (!bookings || bookings.length === 0) {
    container.innerHTML = '<div class="empty-state">Você ainda não possui reservas registradas.</div>';
    return;
  }

  container.innerHTML = bookings
    .map((b) => {
      const isPending = b.status === 'pending';
      const isConfirmed = b.status === 'confirmed';
      const isCancelled = b.status === 'cancelled';

      return `
        <div class="card booking-card">
          <div class="booking-info">
            <div style="display:flex; gap:0.75rem; align-items:center;">
              <strong>Quarto Nº ${escapeHTML(b.room_number)} (${escapeHTML(b.room_type)})</strong>
              <span class="badge badge-status-${escapeHTML(b.status)}">${translateStatus(b.status)}</span>
            </div>
            <div style="font-size:0.9rem; color:var(--text-muted);">
              ID: <code>${escapeHTML(b.id)}</code> | Check-in: <strong>${escapeHTML(b.check_in)}</strong> | Check-out: <strong>${escapeHTML(b.check_out)}</strong>
            </div>
            <div>
              Total: <strong style="color:var(--accent);">R$ ${Number(b.total_price).toFixed(2)}</strong>
              ${b.voucher_code ? ` | Voucher: <code class="badge">${escapeHTML(b.voucher_code)}</code>` : ''}
              ${b.cancellation_refund ? ` | Reembolso: <strong style="color:var(--success)">R$ ${Number(b.cancellation_refund).toFixed(2)}</strong>` : ''}
            </div>
          </div>
          <div class="booking-actions">
            ${isPending ? `<button class="btn btn-success btn-sm btn-pay-booking" data-id="${escapeHTML(b.id)}">💳 Pagar Agora</button>` : ''}
            ${isConfirmed && b.voucher_code ? `<button class="btn btn-outline btn-sm btn-view-voucher" data-id="${escapeHTML(b.id)}">🎟️ Ver Voucher</button>` : ''}
            ${!isCancelled ? `<button class="btn btn-outline-danger btn-sm btn-cancel-booking" data-id="${escapeHTML(b.id)}">❌ Cancelar Reserva</button>` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  container.querySelectorAll('.btn-pay-booking').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const booking = state.bookings.find((b) => b.id === e.target.dataset.id);
      if (booking) openPaymentModal(booking);
    });
  });

  container.querySelectorAll('.btn-view-voucher').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const booking = state.bookings.find((b) => b.id === e.target.dataset.id);
      if (booking && booking.voucher_code) {
        showVoucherModal({
          code: booking.voucher_code,
          room: { number: booking.room_number, type: booking.room_type },
          check_in: booking.check_in,
          check_out: booking.check_out,
          total_price: booking.total_price,
        });
      }
    });
  });

  container.querySelectorAll('.btn-cancel-booking').forEach((btn) => {
    btn.addEventListener('click', (e) => handleCancelBooking(e.target.dataset.id));
  });
}

function translateStatus(status) {
  const map = {
    pending: 'Aguardando Pagamento',
    confirmed: 'Confirmada',
    checked_in: 'Hóspede em Estadia',
    completed: 'Concluída (Check-out)',
    cancelled: 'Cancelada',
  };
  return map[status] || status;
}

function openPaymentModal(booking) {
  document.getElementById('payment-booking-id').value = booking.id;
  document.getElementById('payment-amount-display').textContent = `R$ ${Number(booking.total_price).toFixed(2)}`;
  openModal('modal-payment');
}

async function handlePaymentSubmit(e) {
  e.preventDefault();
  const bookingId = document.getElementById('payment-booking-id').value;
  const method = document.getElementById('payment-method').value;
  const mockStatus = document.getElementById('payment-mock-status').value;

  try {
    const data = await apiFetch('/payments/process', {
      method: 'POST',
      body: JSON.stringify({
        booking_id: bookingId,
        method,
        mock_status: mockStatus,
      }),
    });

    closeModal('modal-payment');

    if (data.payment.status === 'paid' && data.voucher) {
      showToast('Pagamento aprovado! Sua reserva foi confirmada.', 'success');
      showVoucherModal(data.voucher);
    } else {
      showToast('Pagamento recusado. A reserva foi cancelada conforme a política.', 'warning');
    }

    loadBookings();
  } catch (error) {
    showToast(`Erro no processamento do pagamento: ${error.message}`, 'error');
  }
}

function showVoucherModal(voucher) {
  const content = document.getElementById('voucher-content');
  content.innerHTML = `
    <div class="voucher-code">${escapeHTML(voucher.code)}</div>
    <div>
      <p>Hóspede: <strong>${escapeHTML(state.user?.full_name || state.user?.email)}</strong></p>
      <p>Quarto: <strong>Nº ${escapeHTML(voucher.room?.number || '')} (${escapeHTML(voucher.room?.type || '')})</strong></p>
      <p>Check-in: <strong>${escapeHTML(voucher.check_in)}</strong></p>
      <p>Check-out: <strong>${escapeHTML(voucher.check_out)}</strong></p>
      <p>Valor Pago: <strong>R$ ${Number(voucher.total_price).toFixed(2)}</strong></p>
    </div>
    <div style="font-size:0.8rem; color:var(--text-muted); border-top:1px solid var(--border); padding-top:0.75rem;">
      Apresente este voucher no momento do check-in no hotel.
    </div>
  `;
  openModal('modal-voucher');
}

async function handleCancelBooking(bookingId) {
  if (!confirm('Deseja realmente cancelar esta reserva?')) return;

  try {
    const data = await apiFetch(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });

    const refundMsg = data.refund?.amount > 0
      ? `Reserva cancelada. Reembolso estimado: R$ ${Number(data.refund.amount).toFixed(2)} (${data.refund.percentage}%)`
      : 'Reserva cancelada.';

    showToast(refundMsg, 'info');
    loadBookings();
  } catch (error) {
    showToast(`Erro ao cancelar reserva: ${error.message}`, 'error');
  }
}

// PAGE 4: Stay Operations Loader (Check-In & Cleaning Queue)
async function loadStayOps() {
  const queueBox = document.getElementById('cleaning-queue-list');
  if (!queueBox) return;

  try {
    const data = await apiFetch('/stay/cleaning-queue');
    const rooms = data.cleaning_queue || [];

    if (rooms.length === 0) {
      queueBox.innerHTML = '<p class="text-muted" style="font-size:0.875rem;">Nenhum quarto na fila de limpeza ou manutenção.</p>';
      return;
    }

    queueBox.innerHTML = rooms
      .map(
        (r) => `
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); padding:0.5rem 0;">
          <div>Quarto Nº <strong>${escapeHTML(r.number)}</strong> (${escapeHTML(r.type)})</div>
          <button class="btn btn-success btn-sm btn-finish-cleaning" data-id="${escapeHTML(r.id)}">🧹 Marcar Limpo</button>
        </div>
      `
      )
      .join('');

    queueBox.querySelectorAll('.btn-finish-cleaning').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        try {
          await apiFetch(`/rooms/${e.target.dataset.id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: 'available' }),
          });
          showToast('Quarto liberado e disponível!', 'success');
          loadStayOps();
        } catch (err) {
          showToast(`Erro: ${err.message}`, 'error');
        }
      });
    });
  } catch (err) {
    queueBox.innerHTML = `<p class="text-muted">Erro: ${escapeHTML(err.message)}</p>`;
  }
}

async function handleCheckinSubmit(e) {
  e.preventDefault();
  const bookingId = document.getElementById('checkin-booking-id').value;
  const doc = document.getElementById('checkin-doc').value;
  const compStr = document.getElementById('checkin-companions').value;

  const companions = compStr ? [{ name: compStr, cpf_or_passport: doc }] : [];

  try {
    await apiFetch('/stay/check-in', {
      method: 'POST',
      body: JSON.stringify({
        booking_id: bookingId,
        guest_document: doc,
        companions,
      }),
    });

    showToast('Check-in efetuado com sucesso!', 'success');
    e.target.reset();
  } catch (err) {
    showToast(`Erro no check-in: ${err.message}`, 'error');
  }
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const bookingId = document.getElementById('checkout-booking-id').value;

  try {
    await apiFetch('/stay/check-out', {
      method: 'POST',
      body: JSON.stringify({ booking_id: bookingId }),
    });

    showToast('Check-out concluído! Quarto enviado para limpeza.', 'success');
    e.target.reset();
    loadStayOps();
  } catch (err) {
    showToast(`Erro no check-out: ${err.message}`, 'error');
  }
}

// PAGE 5: Chat, Support & Reviews Loader
async function loadChatReviews() {
  loadChatMessages();
  loadNotificationPrefs();
}

async function loadChatMessages() {
  const box = document.getElementById('chat-messages-box');
  if (!box || !state.token) return;

  try {
    const data = await apiFetch('/chat/messages');
    const messages = data.messages || [];

    if (messages.length === 0) {
      box.innerHTML = '<p class="text-muted" style="font-size:0.875rem;">Nenhuma mensagem na conversa.</p>';
      return;
    }

    box.innerHTML = messages
      .map(
        (m) => `
        <div style="margin-bottom:0.75rem;">
          <div><strong style="color:var(--accent);">${escapeHTML(m.sender_name)} (${translateRole(m.sender_role)}):</strong></div>
          <div style="background:#ffffff; padding:0.5rem 0.75rem; border-radius:var(--radius); border:1px solid var(--border); font-size:0.9rem; margin-top:0.25rem;">
            ${escapeHTML(m.message)}
          </div>
        </div>
      `
      )
      .join('');
    box.scrollTop = box.scrollHeight;
  } catch (err) {
    box.innerHTML = `<p class="text-muted">Erro ao carregar mensagens: ${escapeHTML(err.message)}</p>`;
  }
}

async function handleSendChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chat-input-message');
  const message = input.value;

  try {
    await apiFetch('/chat/messages', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });

    input.value = '';
    loadChatMessages();
  } catch (err) {
    showToast(`Erro ao enviar mensagem: ${err.message}`, 'error');
  }
}

async function handleSubmitReview(e) {
  e.preventDefault();
  const bookingId = document.getElementById('review-booking-id').value;
  const rating = Number(document.getElementById('review-rating').value);
  const comment = document.getElementById('review-comment').value;

  try {
    await apiFetch('/reviews', {
      method: 'POST',
      body: JSON.stringify({ booking_id: bookingId, rating, comment }),
    });

    showToast('Avaliação enviada com sucesso! Ela passará por moderação.', 'success');
    e.target.reset();
  } catch (err) {
    showToast(`Erro ao enviar avaliação: ${err.message}`, 'error');
  }
}

async function loadNotificationPrefs() {
  if (!state.token || state.user?.role !== 'Guest') return;
  try {
    const data = await apiFetch('/notifications/preferences');
    if (data.preferences) {
      document.getElementById('pref-stay-reminders').checked = data.preferences.stay_reminders;
      document.getElementById('pref-promotions').checked = data.preferences.promotions;
    }
  } catch (err) {}
}

async function handleNotificationPrefsSubmit(e) {
  e.preventDefault();
  const stay_reminders = document.getElementById('pref-stay-reminders').checked;
  const promotions = document.getElementById('pref-promotions').checked;

  try {
    await apiFetch('/notifications/preferences', {
      method: 'PUT',
      body: JSON.stringify({ stay_reminders, promotions }),
    });
    showToast('Preferências de notificação salvas!', 'success');
  } catch (err) {
    showToast(`Erro ao salvar preferências: ${err.message}`, 'error');
  }
}

// PAGE 6: Reports & Audit Loader
async function loadReportsAudit() {
  try {
    const metricsData = await apiFetch('/reports/metrics');
    const m = metricsData.metrics;

    document.getElementById('metric-total-bookings').textContent = m.total_bookings;
    document.getElementById('metric-total-revenue').textContent = `R$ ${Number(m.total_revenue).toFixed(2)}`;
    document.getElementById('metric-occupancy-rate').textContent = `${m.occupancy_rate_percentage}%`;
  } catch (err) {}

  try {
    const logsData = await apiFetch('/reports/audit-logs');
    const logs = logsData.logs || [];
    const tbody = document.getElementById('audit-logs-tbody');

    if (logs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="padding:1rem; text-align:center; color:var(--text-muted);">Nenhum log gravado.</td></tr>';
      return;
    }

    tbody.innerHTML = logs
      .map(
        (l) => `
        <tr style="border-bottom: 1px solid var(--border); font-size:0.875rem;">
          <td style="padding:0.5rem;">${escapeHTML(l.timestamp)}</td>
          <td style="padding:0.5rem;">${escapeHTML(l.user_name || l.user_email || 'Sistema')}</td>
          <td style="padding:0.5rem;"><code class="badge">${escapeHTML(l.action)}</code></td>
          <td style="padding:0.5rem;">${escapeHTML(l.resource)}</td>
          <td style="padding:0.5rem;">${escapeHTML(l.ip_address || '-')}</td>
        </tr>
      `
      )
      .join('');
  } catch (err) {}
}

async function handleExportReport() {
  try {
    const metricsData = await apiFetch('/reports/metrics');
    const logsData = await apiFetch('/reports/audit-logs');

    const jsonStr = JSON.stringify({ metrics: metricsData.metrics, logs: logsData.logs }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hospedatche-relatorio-auditoria-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Relatório exportado com sucesso!', 'success');
  } catch (err) {
    showToast(`Erro na exportação: ${err.message}`, 'error');
  }
}

// PAGE 7: Staff Room Management
async function loadRoomsAdmin() {
  const grid = document.getElementById('admin-rooms-grid');
  const btnCreate = document.getElementById('btn-open-create-room');

  if (state.user?.role === 'Manager') {
    btnCreate.classList.remove('hidden');
  } else {
    btnCreate.classList.add('hidden');
  }

  grid.innerHTML = '<div class="loading-spinner">Carregando gestão de quartos...</div>';

  try {
    const data = await apiFetch('/rooms');
    const rooms = data.rooms || [];

    if (rooms.length === 0) {
      grid.innerHTML = '<div class="empty-state">Nenhum quarto cadastrado.</div>';
      return;
    }

    grid.innerHTML = rooms
      .map((room) => `
        <div class="card room-card">
          <div class="room-card-header">
            <div>
              <div class="room-type">${escapeHTML(room.type)}</div>
              <div class="room-number">Quarto Nº ${escapeHTML(room.number)}</div>
            </div>
            <span class="badge badge-status-${escapeHTML(room.status)}">
              ${room.status === 'available' ? 'Disponível' : 'Em Limpeza'}
            </span>
          </div>
          <div class="room-details">
            <div>Capacidade: <strong>${escapeHTML(room.capacity)} pessoas</strong></div>
            <div class="room-price">R$ ${Number(room.price_per_night).toFixed(2)} <span>/ noite</span></div>
          </div>
          <div class="booking-actions">
            ${state.user?.role === 'Receptionist' ? `
              <button class="btn btn-outline btn-sm btn-toggle-status" data-id="${escapeHTML(room.id)}" data-status="${room.status}">
                ${room.status === 'available' ? '🧹 Marcar Em Limpeza' : '✅ Marcar Disponível'}
              </button>
            ` : ''}
            ${state.user?.role === 'Manager' ? `
              <button class="btn btn-outline btn-sm btn-edit-room" data-id="${escapeHTML(room.id)}">
                ✏️ Editar Quarto
              </button>
            ` : ''}
          </div>
        </div>
      `)
      .join('');

    grid.querySelectorAll('.btn-toggle-status').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        const current = e.target.dataset.status;
        const nextStatus = current === 'available' ? 'cleaning' : 'available';

        try {
          await apiFetch(`/rooms/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: nextStatus }),
          });
          showToast('Status do quarto atualizado com sucesso!', 'success');
          loadRoomsAdmin();
        } catch (err) {
          showToast(`Erro ao alterar status: ${err.message}`, 'error');
        }
      });
    });

    grid.querySelectorAll('.btn-edit-room').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const room = rooms.find((r) => r.id === e.target.dataset.id);
        if (room) openRoomFormModal(room);
      });
    });
  } catch (error) {
    grid.innerHTML = `<div class="empty-state">Erro: ${escapeHTML(error.message)}</div>`;
  }
}

function openRoomFormModal(room = null) {
  document.getElementById('room-form-id').value = room ? room.id : '';
  document.getElementById('room-number').value = room ? room.number : '';
  document.getElementById('room-type').value = room ? room.type : '';
  document.getElementById('room-price').value = room ? room.price_per_night : '';
  document.getElementById('room-capacity').value = room ? room.capacity : '2';

  document.getElementById('room-form-title').textContent = room ? 'Editar Quarto' : 'Cadastrar Novo Quarto';
  openModal('modal-room-form');
}

async function handleRoomFormSubmit(e) {
  e.preventDefault();
  const roomId = document.getElementById('room-form-id').value;
  const payload = {
    number: document.getElementById('room-number').value,
    type: document.getElementById('room-type').value,
    price_per_night: Number(document.getElementById('room-price').value),
    capacity: Number(document.getElementById('room-capacity').value),
  };

  try {
    if (roomId) {
      await apiFetch(`/rooms/${roomId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      showToast('Quarto atualizado com sucesso!', 'success');
    } else {
      await apiFetch('/rooms', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      showToast('Quarto criado com sucesso!', 'success');
    }

    closeModal('modal-room-form');
    loadRoomsAdmin();
  } catch (error) {
    showToast(`Erro ao salvar quarto: ${error.message}`, 'error');
  }
}

// PAGE 8: Administrator Staff Management
async function handleCreateStaffSubmit(e) {
  e.preventDefault();
  const payload = {
    full_name: document.getElementById('staff-name').value,
    email: document.getElementById('staff-email').value,
    cpf: document.getElementById('staff-cpf').value,
    password: document.getElementById('staff-password').value,
    role: document.getElementById('staff-role').value,
  };

  try {
    await apiFetch('/admin/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    showToast('Conta de funcionário criada com sucesso!', 'success');
    e.target.reset();
  } catch (error) {
    showToast(`Erro ao criar funcionário: ${error.message}`, 'error');
  }
}

async function handlePromoteUserSubmit(e) {
  e.preventDefault();
  const payload = {
    user_id: document.getElementById('promote-user-id').value,
    role: document.getElementById('promote-role').value,
  };

  try {
    await apiFetch('/admin/users', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    showToast('Usuário promovido e sessões anteriores revogadas!', 'success');
    e.target.reset();
  } catch (error) {
    showToast(`Erro ao promover usuário: ${error.message}`, 'error');
  }
}

// PAGE 9: User Profile
async function loadProfile() {
  if (!state.token) return;

  try {
    const data = await apiFetch('/users/me');
    const u = data.user;
    document.getElementById('profile-name').value = u.full_name || '';
    document.getElementById('profile-email').value = u.email || '';
    document.getElementById('profile-cpf').value = u.cpf || '';
    document.getElementById('profile-new-password').value = '';
    document.getElementById('profile-current-password').value = '';
  } catch (error) {
    showToast(`Erro ao carregar perfil: ${error.message}`, 'error');
  }
}

async function handleUpdateProfileSubmit(e) {
  e.preventDefault();

  const payload = {};
  const name = document.getElementById('profile-name').value;
  const email = document.getElementById('profile-email').value;
  const cpf = document.getElementById('profile-cpf').value;
  const newPassword = document.getElementById('profile-new-password').value;
  const currentPassword = document.getElementById('profile-current-password').value;

  if (name) payload.full_name = name;
  if (email) payload.email = email;
  if (cpf) payload.cpf = cpf;
  if (newPassword) payload.password = newPassword;
  if (currentPassword) payload.current_password = currentPassword;

  try {
    const data = await apiFetch('/users/me', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    updateAuthState({ ...state.user, ...data.user }, state.token);
    showToast('Perfil atualizado com sucesso!', 'success');
    loadProfile();
  } catch (error) {
    showToast(`Erro ao atualizar perfil: ${error.message}`, 'error');
  }
}

// Modal Helpers
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

// Auth Handlers
async function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    updateAuthState(data.user, data.token);
    closeModal('modal-auth');
    showToast(`Bem-vindo, ${data.user.full_name || data.user.email}!`, 'success');

    if (data.user.role === 'Receptionist' || data.user.role === 'Manager') {
      switchView('stay-ops');
    } else if (data.user.role === 'Administrator') {
      switchView('staff-admin');
    } else {
      switchView('rooms');
    }
  } catch (error) {
    showToast(`Falha no login: ${error.message}`, 'error');
  }
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const payload = {
    full_name: document.getElementById('reg-name').value,
    email: document.getElementById('reg-email').value,
    cpf: document.getElementById('reg-cpf').value,
    password: document.getElementById('reg-password').value,
  };

  try {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    showToast('Conta criada com sucesso! Faça login para continuar.', 'success');
    document.getElementById('tab-login').click();
  } catch (error) {
    showToast(`Erro no cadastro: ${error.message}`, 'error');
  }
}

// Initialization & Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderNavigation();

  // Responsive Nav Toggle
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  document.querySelectorAll('[data-view]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget.dataset.view;
      if (target) {
        if (navMenu) navMenu.classList.remove('open');
        switchView(target);
      }
    });
  });

  document.getElementById('form-search-rooms').addEventListener('submit', (e) => {
    e.preventDefault();
    const cIn = document.getElementById('search-check-in').value;
    const cOut = document.getElementById('search-check-out').value;
    const guests = document.getElementById('search-guests').value;
    const minPrice = document.getElementById('search-min-price').value;
    const maxPrice = document.getElementById('search-max-price').value;

    if (cIn && cOut && cIn >= cOut) {
      showToast('A data de check-out deve ser posterior ao check-in.', 'warning');
      return;
    }

    state.searchCriteria = {
      check_in: cIn,
      check_out: cOut,
      guests: guests || 1,
    };
    if (minPrice) state.searchCriteria.min_price = minPrice;
    if (maxPrice) state.searchCriteria.max_price = maxPrice;

    document.getElementById('btn-clear-search').classList.remove('hidden');
    switchView('rooms');
  });

  document.getElementById('btn-clear-search').addEventListener('click', () => {
    state.searchCriteria = null;
    document.getElementById('btn-clear-search').classList.add('hidden');
    document.getElementById('form-search-rooms').reset();
    loadRooms();
  });

  document.getElementById('btn-open-login').addEventListener('click', () => openModal('modal-auth'));
  document.getElementById('btn-logout').addEventListener('click', () => logoutUser());

  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.classList.remove('hidden');
    formRegister.classList.add('hidden');
  });

  tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.classList.remove('hidden');
    formLogin.classList.add('hidden');
  });

  document.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      closeModal(e.target.getAttribute('data-close'));
    });
  });

  document.getElementById('form-login').addEventListener('submit', handleLoginSubmit);
  document.getElementById('form-register').addEventListener('submit', handleRegisterSubmit);
  document.getElementById('btn-confirm-booking').addEventListener('click', handleConfirmBooking);
  document.getElementById('form-process-payment').addEventListener('submit', handlePaymentSubmit);
  document.getElementById('form-update-profile').addEventListener('submit', handleUpdateProfileSubmit);
  document.getElementById('form-create-staff').addEventListener('submit', handleCreateStaffSubmit);
  document.getElementById('form-promote-user').addEventListener('submit', handlePromoteUserSubmit);
  document.getElementById('form-room-manage').addEventListener('submit', handleRoomFormSubmit);

  // New Page Event Listeners
  const formStayCheckin = document.getElementById('form-stay-checkin');
  if (formStayCheckin) formStayCheckin.addEventListener('submit', handleCheckinSubmit);

  const formStayCheckout = document.getElementById('form-stay-checkout');
  if (formStayCheckout) formStayCheckout.addEventListener('submit', handleCheckoutSubmit);

  const formSendChat = document.getElementById('form-send-chat');
  if (formSendChat) formSendChat.addEventListener('submit', handleSendChatSubmit);

  const formSubmitReview = document.getElementById('form-submit-review');
  if (formSubmitReview) formSubmitReview.addEventListener('submit', handleSubmitReview);

  const formNotificationPrefs = document.getElementById('form-notification-prefs');
  if (formNotificationPrefs) formNotificationPrefs.addEventListener('submit', handleNotificationPrefsSubmit);

  const btnExportReport = document.getElementById('btn-export-report');
  if (btnExportReport) btnExportReport.addEventListener('click', handleExportReport);

  document.getElementById('btn-open-create-room').addEventListener('click', () => openRoomFormModal());
  document.getElementById('btn-refresh-bookings').addEventListener('click', loadBookings);

  switchView('home');
});
