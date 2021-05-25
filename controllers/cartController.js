const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Toko = require("../models/Toko");

module.exports.showUserCart_get = async function (req, res) {
  try {
    const cart = await Cart.findAll({
      where: { id_user: req.params.id_user },
      include: [
        {
          model: Product,
          attributes: [
            "id_barang",
            "id_toko",
            "nama_barang",
            "harga_barang",
            "foto",
            "qty",
          ],
          include: [
            {
              model: Toko,
              attributes: ["nama_toko", "kontak_toko"],
            },
          ],
        },
      ],
    });
    res.status(201).json(cart);
  } catch (err) {
    res.status(200).json(err);
  }
};

module.exports.addCart_post = async function (req, res) {
  const product = await Product.findByPk(req.body.id_barang);
  const cartList = await Cart.findOne({
    where: {
      id_user: req.body.id_user,
      id_barang: req.body.id_barang,
    },
  });
  const { id_user, id_barang, qty } = req.body;
  const { id_toko } = product;
  if (cartList) {
    try {
      let newQty = 0;
      newQty = parseInt(cartList.qty) + parseInt(qty);
      if (newQty > product.qty) {
        res.status(200).json("Quantity barang error");
        return;
      }
      newTotal = newQty * product.harga_barang;
      cartList.update({ qty: newQty, total_price: newTotal });
      res.status(201).json("Cart updated!");
    } catch (error) {
      res.status(200).json(error);
    }
  } else {
    try {
      let total_price = qty * product.harga_barang;
      if (qty > product.qty) {
        res.status(200).json("Quantity barang error");
        return;
      }
      const cart = await Cart.create({
        id_user,
        id_barang,
        id_toko,
        qty,
        total_price
      });
      res.status(201).json({ cart: cart.id_cart });
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(200).json({
          success: false,
          msg: err.errors.map((e) => e.message),
        });
      }
    }
  }
};

module.exports.editCart_post = async function (req, res) {
  const cart = await Cart.findByPk(req.body.id_cart);
  const product = await Product.findByPk(cart.id_barang);
  newQty = req.body.qty;
  if (parseInt(newQty) > parseInt(product.qty)) {
    newQty = product.qty;
  }
  newTotal = newQty * product.harga_barang;
  try {
    cart.update({ qty: newQty, total_price: newTotal });
    res.status(201).json("Cart has been updated!");
  } catch (err) {
    res.status(200).json(err);
  }
};

module.exports.deleteCart = async function (req, res) {
  try {
    await Cart.destroy({ where: { id_cart: req.params.id_cart } });
    res.status(201).json("Barang berhasil dihapus dari keranjang");
  } catch (err) {
    res.status(200).json(err);
  }
};
