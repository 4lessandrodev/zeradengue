const INPUT_RADIO_ATENDIDO = document.getElementById('atendido');
const INPUT_RADIO_PENDENTE = document.getElementById('pendente');
const INPUT_LUPA = document.getElementById('lupa');
const DATA_INICIAL = document.getElementById('data-inicial');
const DATA_FINAL = document.getElementById('data-final');
let status;

function AplicarFiltro() {
  if (INPUT_RADIO_ATENDIDO.checked) {
    status = 2;
  } else {
    status = 1;
  }

  let link = `/users/home?status=${status}&start=${DATA_INICIAL.value}&end=${DATA_FINAL.value}`;
  location.href = link;
}

INPUT_RADIO_ATENDIDO.addEventListener('click', AplicarFiltro);
INPUT_RADIO_PENDENTE.addEventListener('click', AplicarFiltro);
INPUT_LUPA.addEventListener('click', AplicarFiltro);