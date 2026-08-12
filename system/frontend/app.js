document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('backend-status');

  try {
    const response = await fetch('http://localhost:3000/api/v1/health');
    if (response.ok) {
      const data = await response.json();
      statusEl.textContent = `Conectado ao backend: ${data.system} (${data.status.toUpperCase()})`;
      statusEl.style.color = 'var(--success)';
    } else {
      statusEl.textContent = 'Servidor backend respondeu com erro.';
      statusEl.style.color = 'var(--danger)';
    }
  } catch (err) {
    statusEl.textContent = 'Servidor backend offline ou inalcançável (http://localhost:3000).';
    statusEl.style.color = 'var(--danger)';
  }
});
