const DATA_INICIAL = document.querySelector('#data-inicial');
const DATA_FINAL = document.querySelector('#data-final');
const STATUS = document.querySelectorAll('input[name=status]');
const BTN_BUSCAR = document.querySelector('.btn-buscar');
let satus = 1;

const requisicao = () => {
  if (DATA_INICIAL.value != '' && DATA_FINAL.value != '') {
    (STATUS[1].checked) ? status = 2 : status = 1;
    location.href = `/users?status=${status}&inicio=${DATA_INICIAL.value}&fim=${DATA_FINAL.value}`;
  } else {
    swal("Opps!", "Informe data inicial", "info");
  }
};

BTN_BUSCAR.addEventListener('click', requisicao);
STATUS[0].addEventListener('click', requisicao);
STATUS[1].addEventListener('click', requisicao);