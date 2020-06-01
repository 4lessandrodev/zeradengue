# zeradengue

####  Tecnologias
- NodeJS, 
- JavaScript,
- Bootstrap,
- CSS,
- SQL,
- Express,

> 
Para este projeto foi utilizado SQL puro, seguindo as boas práticas de orientação objeto.
>

```javascript
class Usuario{

  //O construtor recebe parâmetros default de acordo com as colunas do banco de dados
  //Se a coluna do BD não aceita valores nulos a variável deve ter um valor default
  constructor (email, senha, data_cadastro=new Date(), admin=0, ativo=1, nome='Anônimo', imagem='no_image.png') {
    this.id = null; //Para aplicar filtros e buscas da model em GenericDao
    this.tableName = 'usuarios'; //Para saber qual tabela manipular no banco de dados através da GenericDao
    this.modelName = 'Usuario'; //Para saber qual atributo selecionar na classe GenericDao
    this.Usuario = { //Objeto a ser informado como json na GenericDao para salvar sem ter que informar colunas
      email,
      senha,
      admin,
      data_cadastro,
      ativo,
      nome,
      imagem
    };
  }
}
```


```javascript
class GenericDao{
  constructor (model) {
    this.Model = model;
  }
  //--------------------------------INÍCIO METODO SALVAR-------------------
  //Salvar um elemento no banco de dados de acordo com as informações passadas 
  static salvar(model) {
    //Salvar a model
    return new Promise((resolve, reject) => {
      conect.query(`INSERT INTO ${model.tableName} SET ?`, model[model.modelName], (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  //--------------------------------FIM METODO SALVAR----------------------
```

Projeto desenvolvido para a série de vídeos do youtube:

[Link Playlist Youtube](https://www.youtube.com/watch?v=50Wtl2q1-vc&list=PLUxrX6EvA-2aMiGnAk1sbMCuc5FE1mscK "Link")

> Pagina de Login

![Login](http://alessandrodev.com/imagens/zeradengue1.jpg "Login")

> Pagina de Home

![Home](http://alessandrodev.com/imagens/zeradengue2.jpg "Home")

> Pagina de Filtros

![Filtros](http://alessandrodev.com/imagens/zeradengue3.jpg "Filtros")

> Pagina de Lançamento

![Lançamento](http://alessandrodev.com/imagens/zeradengue4.jpg "Lançamento")

> Pagina de Seleção

![Seleção](http://alessandrodev.com/imagens/zeradengue5.jpg "Seleção")

