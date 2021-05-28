const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const stripe = require("stripe")(stripeSecretKey);
const User = require("../models/User");
const Cart = require("../models/Cart");
const Biodata = require("../models/Biodata");
const Product = require("../models/Product");
const Toko = require("../models/Toko");
const OrderList = require("../models/OrderList");

module.exports.showOrderAdmin_get = async function (req, res) {
  try {
    const orderlist = await OrderList.findAll();
    console.log(orderlist);
    res.status(201).json(orderlist);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.showOrderUser_get = async function (req, res) {
  try {
    const orderlist = await OrderList.findAll({
      where: { id_user: req.params.id_user, status: {[Op.not]: 1}},
    });
    console.log(orderlist);
    res.status(201).json(orderlist);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.showOrderToko_get = async function (req, res) {
  try {
    const invoice = await OrderList.findAll({
      where: { id_toko: req.params.id_toko, status: {[Op.not]: 1}},
    });
    res.status(200).json(invoice);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.checkOut = async function (req, res) {
  const stripeToken = req.body.token;
  const listOrders = req.body.listOrder;
  console.log(listOrders);
  try {
    let allTotal = 0;
    listOrders.forEach(async (listOrder) => {
      allTotal += listOrder.total_price;
      const biodata = await Biodata.findOne({where:{id_user: listOrder.id_user}});
      const product = await Product.findByPk(listOrder.id_barang);
      const user = await User.findByPk(listOrder.id_user);
      const email = user.email;
      const {id_user, id_barang, id_toko, qty, total_price} = listOrder;
      const {nama_barang} = listOrder.product;
      const {nama_toko, kontak_toko} = listOrder.product.toko;
      const {nama, alamat}= biodata;
      const status = 2;
      if (product.qty < qty) {
        res.status(400).json("Jumlah barang tersedia tidak mencukupi");
        return;
      }
      const newQty = product.qty - qty;
      await OrderList.create({
          id_user,
          email,
          nama,
          alamat,
          id_barang,
          nama_barang,
          qty,
          total_price,
          id_toko,
          nama_toko,
          kontak_toko,
          status
      });
      await product.update({ qty: newQty });
      await Cart.destroy({where:{id_cart: listOrder.id_cart}})
    });

    allTotal *= 100;
    stripe.charges
      .create({
        amount: allTotal,
        source: stripeToken.id,
        currency: "idr",
      })
      .then(async function () {
        console.log("Charge Success!");
        res.status(201).json({ message: "Charge has been made successfully!" });
      })
      .catch(function () {
        console.log("Charge Failed!");
        res.status(400).json({ message: "Failed to create charge!" });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports.sendProduct = async function (req, res) {
  const findList = await OrderList.findByPk(req.body.id_order);
  try {
    let newStatus = 3;
    findList.update({ status: newStatus });
    res.status(201).json("Status updated: Product is on the way!");
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.productArrived = async function (req, res) {
  const findList = await OrderList.findByPk(req.body.id_order);
  try {
    let newStatus = 4;
    findList.update({ status: newStatus });
    res.status(201).json("Status updated: Product Arrived!");
  } catch (err) {
    res.status(400).json(err);
  }
};