const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const connection = require('./database/database')

const productController = require('./product/ProductController')
const clientController = require('./client/ClientController')
const saleController = require('./sale/SaleController')
const userController = require('./user/UsersController')
const categoriesController = require('./categories/CategoriesController')

const Category = require("./categories/Category")
const Product = require("./product/Product")
const Client = require('./client/Client')
const Sale = require('./sale/Sale')
const Item = require('./item/Item')


// View engine
app.set('view engine', 'ejs')

// session
app.use(session({
    secret: "ksoksokskdokajsoa",
    cookie: {maxAge: 7200000000}
}))

// static
app.use(express.static('public'))

// body parser 
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}))
app.use(bodyParser.json())

// database
connection
    .authenticate()
    .then(() => console.log('Conexão estabelecida com sucesso!'))
     .catch(error => console.log(error))

app.use('/', productController)
app.use('/', clientController)
app.use('/', saleController)
app.use('/', userController)
app.use('/', categoriesController)

app.get('/', (req, res) => {
    Product.findAll().then(products => {
        if(products){
            res.render('index', {products})
        }
        else {
            res.send('Erro')
        }
    })
    
})

app.get('/category/:slug', (req, res) => {
    const slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Product}]
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render('index', { products: category.produtos,  categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch(err => {
        res.send('Erro de conexao')
    })
})

app.listen(8080, () => {
    // connection.sync({force: true})
    console.log('O servidor está rodando!')
})