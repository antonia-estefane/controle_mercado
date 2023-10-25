const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Product = require("../product/Product");
const Client = require("../client/Client");
const Item = require("../item/Item");
const slugify = require("slugify");
const Sale = require("./Sale");
const format = require('date-fns/format');


router.get("/admin/sales", async (req, res) => {
    const sales = await Sale.findAll({ 
      order: [['id', 'DESC']],
      include: [{ model: Client }] });
    res.render("admin/sales/index", { sales })
  
});


router.get("/admin/sales/new", async (req, res) => {
  const clients = await Client.findAll();
  const products = await Product.findAll();
  res.render("admin/sales/new", { clients, products });
});

router.post("/admin/sale/save", async (req, res) => {
  const { cliente, preco_venda, produtos, quantidades } = req.body;
  const sale = await Sale.create({
    preco_venda,
    data: Date.now(),
    slug: "",
    clienteId: cliente,
  });
  if (sale) {
    const saleId = sale.dataValues.id;
    const itens = [];
    for (let i = 0; i < produtos.length; i++) {
      itens.push({
        productId: produtos[i],
        quantity: quantidades[i],
        saleId
      });
    }
    await Item.bulkCreate(itens);
    res.redirect("/admin/sales");
  } else {
    res.status(400).send("ERRO")
  }
});

// router.get("/admin/sale/:id", (req, res) => {
//   let id = req.params.id

//   Sale.findOne({
//     include: [{ model: Client }],
//     where: {
//       id: id
//     }
    
//   }).then(sales => {
//       if (sales != undefined) {
//         Item.findAll({
//           include: [{ model: Product }] 
//         }         
//         ).then(itens => {
//           res.render('admin/sales/sale', { sales, itens })
//         })
//       } else {
//         res.redirect('/')
//       }
//     })
//     .catch(() => res.redirect('/'))
// });

router.get("/admin/sale/:id", (req, res) => {
  const id = req.params.id;

  Sale.findOne({
    include: [{ model: Client }],
    where: {
      id: id
    }
  })
    .then(sales => {
      if (sales != undefined) {
        Item.findAll({
          include: [{ model: Product }]
        }).then(itens => {
          // Criar um objeto com os dados
          const data = {
            sales,
            itens
          };
          // Enviar os dados em JSON
          res.json(data);
        });
      } else {
        res.status(404).json({ message: 'Venda não encontrada' });
      }
    })
    .catch(error => {
      console.error('Erro ao buscar detalhes da venda', error);
      res.status(500).json({ message: 'Erro ao buscar detalhes da venda' });
    });
});


module.exports = router;
