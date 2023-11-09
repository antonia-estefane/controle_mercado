const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcryptjs')
const sequelize = require('sequelize')
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/users', adminAuth, async (req, res) => {
    const users = await User.findAll()
    res.render('admin/users/index', { users })

})

router.get('/admin/users/new', (req, res) => {
    res.render('admin/users/new')
})

router.post('/users/save', (req, res) => {
    const {email, senha} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(senha, salt)

    User.findOne({where: {email: email}}).then(user => {
        if(user == undefined) {
            const user = User.create({
                email,
                senha: hash
            })
        
            if(user) {
                res.redirect('/')
            }
        }else {
            res.send('ERROR: email já existe')
        }
    })

})

router.get('/login', (req, res) => {
    res.render('admin/users/login')
})

router.post('/authenticate', (req, res) => {
    let email = req.body.email 
    let senha = req.body.senha
    User.findOne( { where: { email: email } } ).then(user => {
        if(user != undefined) {
            // validar senha
            const correct = bcrypt.compareSync(senha, user.senha)
            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/')
            }
            else {
                res.send('ERRO')
            }
        } else {
            res.send('ERRRRRRRRO')
            
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/login')
})

module.exports = router