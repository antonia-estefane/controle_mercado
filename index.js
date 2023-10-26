const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

productController = require('./product/ProductController')
clientController = require('./client/ClientController')
saleController = require('./sale/SaleController')

Product = require('./product/Product')
Client = require('./client/Client')
Sale = require('./sale/Sale')
Item = require('./item/Item')

// View engine
app.set('view engine', 'ejs')

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

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => {
    // connection.sync({force: true})
    console.log('O servidor está rodando!')
})