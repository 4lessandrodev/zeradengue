const ICONE_DEFAULT = document.querySelector('.icone-camera');
const DIV_GERAL_IMAGE = document.querySelector('.imagem');
const INPUT_FILE = document.getElementById('imagem');



function openFile(event) {
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function () {
    var dataURL = reader.result;
    ICONE_DEFAULT.style.display = 'none';
    DIV_GERAL_IMAGE.style.backgroundImage = `url("${dataURL}")`;
  };
  reader.readAsDataURL(input.files[0]);
}

const IMPORTAR = () => {
  INPUT_FILE.click();
};

DIV_GERAL_IMAGE.addEventListener('click', IMPORTAR);
