const router = require('express').Router();

router.get('/', (req, res)=>{ res.send('exmplo de rota')});




module.exports = {
    Router: router
}