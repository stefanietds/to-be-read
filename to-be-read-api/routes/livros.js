var express = require('express');
var router = express.Router();
var mongoUtil = require('../services/db')
const { ObjectId } = require('mongodb')

//se comunica com db para fazer conexão
mongoUtil.connectToServer(function (err) {
  if (err) console.log(err);

  router.get('/list', function (req, res, next) {
    mongoUtil.findDocuments('livros').then(data => {
      res.send({ data })
    })
  });
//Rotas que chamam as funções
  router.put('/update', function (req, res, next) {
    const { text, active, edit } = req.body
    mongoUtil.updateDocument('livros',
      { _id: ObjectId(req.body._id) },
      { text, active, edit }
    ).then(data => {
      res.send({ data })
    });
  });

  router.post('/insert', function (req, res, next) {
    console.log(req.body)
    mongoUtil.insertDocument('livros', req.body).then(data => {
      res.send({ data })
    })
  });

  router.delete('/delete', function (req, res, next) {
    mongoUtil.removeDocument('livros', { _id: ObjectId(req.body._id) }).then(data => {
      res.send({ data })
    })
  });
})

module.exports = router;
