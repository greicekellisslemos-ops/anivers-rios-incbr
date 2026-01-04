let currentTab = 'destaque';
let registros = [];

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(div => div.classList.add('hidden'));
  document.getElementById(tab).classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab-btn[onclick="showTab('${tab}')"]`).classList.add('active');
  currentTab = tab;
  renderTab(tab);
}

function renderTab(tab) {
  let lista = document.getElementById('lista-' + tab);
  let vazio = document.getElementById('vazio-' + tab);
  if (!lista) return;

  let items = registros.filter(r => r.categoria === tab || (tab === 'destaque' && r.categoria !== 'casamentos' && new Date(r.data).getMonth() === new Date().getMonth()));
  
  if (items.length === 0) {
    lista.innerHTML = '';
    vazio?.classList.remove('hidden');
  } else {
    vazio?.classList.add('hidden');
    lista.innerHTML = '';
    items.forEach(r => {
      let card = document.createElement('div');
      card.className = 'bg-white p-4 rounded shadow';
      card.innerHTML = `<h3 class="font-bold">${r.nome}</h3><p>${new Date(r.data).toLocaleDateString()}</p>`;
      lista.appendChild(card);
    });
  }
}

document.getElementById('form-adicionar').addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;
  const categoria = document.getElementById('categoria').value;
  registros.push({ nome, data, categoria });
  document.getElementById('form-adicionar').reset();
  showTab(categoria === 'casamentos' ? 'casamentos' : categoria);
});
