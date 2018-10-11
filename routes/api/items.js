var router = require('express').Router();
var auth = require('../auth');

router.get('/listar', auth.required, function(req, res, next){
    const lista = new Array();
    lista.push({codigo: 1, nombre: 'computadora'})
    lista.push({codigo: 1, nombre: 'radio'})
    lista.push({codigo: 1, nombre: 'aire'})
    res.json(lista);
});

module.exports = router;