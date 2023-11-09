const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const Client = require('./Client')
const slugify = require('slugify')
const adminAuth = require('../middlewares/adminAuth')


router.get('/admin/clients/new', adminAuth, (req, res) => {
    res.render('admin/clients/new')
})

router.post('/clients/save', (req, res) => {
    let nome = req.body.nome
    let cpf = req.body.cpf
    let endereco = req.body.endereco
    let telefone = req.body.telefone

    Client.create({
        nome: nome,
        slug: slugify(nome),
        cpf: cpf,
        endereco: endereco,
        telefone: telefone
    }).then(() => res.redirect('/admin/clients'))
})

router.post('/clients/delete', (req, res) => {
    let id = req.body.id

    if(id != undefined) {
        if(!isNaN(id)) {
            Client.destroy({
                where: {
                    id: id
                }
            }).then(res.redirect('/admin/clients'))
        }
    }
})

router.get('/admin/clients/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id

    if(isNaN(id)) {res.redirect('/admin/clients')}

    Client.findByPk(id).then(client => {
        if(client != undefined) {
            res.render('admin/clients/edit', {client})
        } else {
            res.redirect('/admin/clients')
        }
    }).catch(error => console.log(error))
})

router.post('/clients/update', (req, res) => {
    let id = req.body.id
    let nome = req.body.nome
    let cpf = req.body.cpf
    let endereco = req.body.endereco
    let telefone = req.body.telefone

    Client.update({
        nome: nome,
        slug: slugify(nome),
        cpf: cpf,
        endereco: endereco,
        telefone: telefone
    }, {
        where: {id:id}
    }
    ).then(() => res.redirect('/admin/clients'))
})

router.get('/admin/clients', adminAuth, (req, res) => {
    Client.findAll().then(clients => {
        res.render('admin/clients/index', {clients})
    })
})

module.exports = router