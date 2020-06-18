const DIV_IMG = document.getElementById('upload-img');
const INPUT_FILE = document.getElementById('input_file');
const ICONE = document.querySelector('.icone-camera');

function upload() {
  INPUT_FILE.click();
}

function fileReader(event) {
  let input = event.target;
  let reader = new FileReader();

  reader.onload = function () {
    let dataUrl = reader.result;
    DIV_IMG.style.backgroundImage = `url("${dataUrl}")`;
    ICONE.style.display = 'none';
  };
  reader.readAsDataURL(input.files[0]);
}

DIV_IMG.addEventListener('click', upload);


