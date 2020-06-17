# zeradengue

Veja o projeto em produção: [Clique aqui](http://alessandrodev.com:21141 "Clique aqui")

####  Branches
Este projeto possui duas Branches [[Master] ](https://github.com/ALESSANDROLMENEZES/zeradengue "[Master] ") e [[Dev]](https://github.com/ALESSANDROLMENEZES/zeradengue/tree/dev "[Dev]") na Branch Dev foi desenvolvido utilizando o padrão orientado a objeto com classes e SQL puro, enquanto na Master foi utilizado o padrão de models e sequelize, na série de vídeos do youtube só foi explicado a utilização do sequelize.

Tem dúvidas?
Entre no canal de dúvidas do slack:[ Clique aqui](https://join.slack.com/t/alessandrodev/shared_invite/zt-dvzz7tw7-zl5jN0wDfKDaDzRiEyH5oA " Clique aqui")


####  Tecnologias
- NodeJS, 
- JavaScript,
- Bootstrap,
- CSS,
- SQL,
- Express,
- Sequelize

> 
Para este projeto foi utilizado sequelize.
>

```javascript
  save: async (req, res) => {
    try {
      
      //Usuário conectado
      let id = 1;
      let {
        descricao,
        endereco,
        bairro,
        cidades_id
      } = req.body;

      let { files } = req;

      let result = await Ocorrencia.create(
        {
          usuarios_id:id,
          descricao,
          endereco,
          bairro,
          cidades_id,
          imagem:files[0].filename
        }
      );

      res.send(result);

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  },
```


```javascript
  list: async (req, res) => {
    try {
      //Id do usuário conectado
      let id = 1;

      const currentDate = new Date();
      let dateStart = moment(currentDate).subtract(30, 'days').format('YYYY-MM-DD hh:mm:ss');
      let dateEnd = moment(currentDate).add(1, 'day').format('YYYY-MM-DD hh:mm:ss');

      let { limit = 20, status = 1, start = dateStart, end = dateEnd, page=1 } = req.query;
      limit = parseInt(limit);
      page = parseInt(page - 1);
      let { count: size, rows: ocorrencias } = await Ocorrencia.findAndCountAll(
        {
          where: {
            usuarios_id: id,
            status_id: status,
            data_hora: { [Op.between]: [start, end] },
          },
          limit,
          offset:page * limit
        }
      );

      res.send({ size, ocorrencias });

    } catch (error) {
      res.send({ error: [{ msg: 'Erro' }] });
    }
  }
  //--------------------------------FIM METODO LISTAR----------------------
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

