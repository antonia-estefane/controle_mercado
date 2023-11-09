const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()
const Product = require('./Product')
const Category = require('../categories/Category')
const slugify = require('slugify')
const adminAuth = require('../middlewares/adminAuth')


router.get('/admin/products/new', adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/products/new', { categories })
    })
})

router.post('/products/save', (req, res) => {
    let {
        nome_produto,
        preco_venda,
        preco_custo,
        qtd_estoque,
        categoriaId,
        fornecedor,
        foto
    } = req.body;

    if (nome_produto != undefined) {
        Product.create({
            slug: slugify(nome_produto),
            nome_produto,
            preco_venda,
            preco_custo,
            qtd_estoque,
            categoriaId,
            fornecedor,
            foto
        }).then(() => res.redirect('/admin/products'))
    } else {
        res.send(`error`)
    }
})

router.get('/admin/products', adminAuth, (req, res) => {
    Product.findAll({
        order: [['id', 'DESC']],
        include: [{ model: Category }]
      }).then(products => {
        res.render('admin/products/index', {products})
    })
})

router.post('/products/delete', (req, res) => {
    let id = req.body.id
    
    if(id != undefined) {
        if(!isNaN(id)) {
            Product.destroy({
                where: {
                    id: id
                }
            }).then(res.redirect('/admin/products'))
        } else {
            res.redirect('/admin/products')
        }
    }else {
        res.redirect('/admin/products')
    }
})

router.get('/admin/products/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id

    if(isNaN(id)) {res.redirect('/admin/products')}

    Product.findByPk(id).then(product =>  {
        if(product != undefined) {
            res.render('admin/products/edit', {product})
        } else {
            res.redirect('/admin/products')
        }
    }).catch(error => console.log(error))
})

router.post('/products/update', (req, res) => {
    let id = req.body.id
    let nome_produto = req.body.nome_produto
    let preco_venda = req.body.preco_venda
    let preco_custo = req.body.preco_custo
    let qtd_estoque = req.body.qtd_estoque
    let categoria = req.body.categoria
    let fornecedor = req.body.fornecedor
    
    Product.update({
        nome_produto: nome_produto,
        slug: slugify(nome_produto),
        preco_venda: preco_venda,
        preco_custo: preco_custo,
        qtd_estoque: qtd_estoque,
        categoria: categoria,
        fornecedor: fornecedor
    }, {
    where: {
        id: id
    }
    }).then(() => res.redirect('/admin/products'))
    

})

module.exports = router