const express = require('express')
const router = express.Router()
const Category = require('./Category')
const slugif = require('slugify')
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/categories/new', adminAuth, (req, res) => {
  res.render('admin/categories/new')
})

router.post('/categories/save', adminAuth, (req, res) => {
  let nome = req.body.nome
  if (nome != undefined) {
    Category.create({
      nome: nome,
      slug: slugif(nome)
    }).then(() => res.redirect('/admin/categories'))
  } else {
    res.redirect('/admin/categories/new')
  }
})

router.get('/admin/categories', adminAuth, (req, res) => {
  Category.findAll().then(categories => {
    res.render('admin/categories/index', { categories })
  })
})

router.post('/categorias/delete', adminAuth, (req, res) => {
  let id = req.body.id
  if (id != undefined && !isNaN(id)) {
    Category.destroy({
      where: {
        id: id
      }
    }).then(() => res.redirect('/admin/categories'))
  } else {
    res.redirect('/admin/categories')
  }
})

router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
  let id = req.params.id
  if (isNaN(id)) {
    res.redirect('/admin/categories')
  }

  Category.findByPk(id)
    .then(category => {
      if (category != undefined) {
        res.render('admin/categories/edit', { category })
      } else {
        res.redirect('/admin/categories')
      }
    })
    .catch(() => res.redirect('/admin/categories'))
})

router.post('/categories/update', adminAuth, (req, res) => {
  const {id, nome} = req.body

  Category.update(
    { nome: nome, slug: slugif(nome) },
    {
      where: {
        id: id
      }
    }
  ).then(() => res.redirect('/admin/categories'))
})

module.exports = router
