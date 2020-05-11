const INPUT_CIDADE = document.querySelector('#cidade');
const LISTA = document.querySelector('#cidades');

//Cria a lista em html e atribui ao site
const criarListaHtml = (list) => {
  var html = '';
  for (var item of list) {
    html += `<option value="${item.id}-${item.descricao}-${item.sigla}">`;
  }
  LISTA.innerHTML = html;
};

//Realiza a busca pelas cidades
async function BUSCAR_CIDADES() {
  try {
    var param = INPUT_CIDADE.value.toUpperCase();
    var promise = await fetch(`/users/listar-cidades?filtro=${param}`);
    if (!promise.ok) {
      throw new Error('Não foi possível listar cidades');
    }
    var lista = await promise.json();
    return lista;
  } catch (error) {
    console.log(error);
  }
}

//Iniciar a busca
async function CRIAR_LISTA() {
  try {
    if (INPUT_CIDADE.value.length >= 2) {
      var novaLista = await BUSCAR_CIDADES();
      criarListaHtml(novaLista);
    }
  } catch (error) {
    console.log(error);
  }
}

INPUT_CIDADE.addEventListener('keyup', CRIAR_LISTA);
