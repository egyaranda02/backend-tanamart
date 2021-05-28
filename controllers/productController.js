const Sequelize = require("sequelize");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Toko = require("../models/Toko");
const imgbbUploader = require("imgbb-uploader");

module.exports.getProduct = async function(req, res){
  try{
      const product = await Product.findAll({include: 
        [{
          model: Toko,
          attributes: ["id_toko","nama_toko", "kontak_toko"],
        }]
      });
      res.status(201).json(product);
  }catch(err){
      res.status(400).json(err);
  }
  
};

module.exports.getProductDetails = async function (req, res) {
  try{
      const product = await Product.findByPk(req.params.id_barang, {include: [
          {
            model: Toko,
            attributes: ["id_toko","nama_toko", "kontak_toko"],
          },
        ]
      });
      console.log(product);
      res.status(201).json(product);
  }catch(err){
      res.status(400).json(err);
  }
};

module.exports.getProductToko = async function (req, res) {
  const id_toko = req.params.id_toko;
  try{
      const product = await Product.findAll({where:{id_toko}});
      console.log(product);
      res.status(201).json(product);
  }catch(err){
      res.status(400).json(err);
  }
};

module.exports.addProduct_post = async function (req, res) {
  const { id_toko, nama_barang, harga_barang, qty, deskripsi } = req.body;
  imgbbUploader(proccess.env.IMGBB_API, "./uploads/foto_barang/"+req.file.filename)
  .then(async(response)=>{
    const foto = response.display_url;
    const product = await Product.create({
      id_toko,
      nama_barang,
      harga_barang,
      foto,
      qty,
      deskripsi
    });
    res.status(201).json({ barang: product.id_barang });
  }) .catch ((err) =>{
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        msg: err.errors.map((e) => e.message),
      });
    }
  })
};

module.exports.editProduct_post = async function (req, res) {
  const id_barang = req.body.id_barang;
  imgbbUploader(proccess.env.IMGBB_API, "./uploads/foto_barang/"+req.file.filename)
  .then(async(response)=>{
    const product = await Product.findByPk(id_barang);
    const newFoto = response.display_url;
    try {
      const newNama_barang = req.body.nama_barang;
      const newHarga_barang = req.body.harga_barang;
      const newQty = req.body.qty;
      const newDeskripsi = req.body.deskripsi;
      product.update({
        nama_barang: newNama_barang,
        harga_barang: newHarga_barang,
        foto: newFoto,
        qty: newQty,
        deskripsi: newDeskripsi
      });
      const cartLists = await Cart.findAll({where:{id_barang: product.id_barang}});
      if(cartLists){
        try{
          cartLists.forEach(async(cartList)=>{
            let newTotal = parseInt(cartList.qty) * newHarga_barang;
            cartList.update({total_price: newTotal});
          });
        }catch(err){
          console.log(err);
        }
      }
      res.status(201).json("product updated!");
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({
          success: false,
          msg: err.errors.map((e) => e.message),
        });
      }
    }
  }) 
  .catch((err)=>{
    console.log(err);
  });
};

module.exports.findProduct_get = async function(req, res){
  try{
    let lookupValue = req.params.nama_barang;
    console.log(lookupValue);
    const product = await Product.findAll({where:{
      nama_barang: 
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nama_barang')), 'LIKE', '%' + lookupValue + '%')
      }, 
      include: [
        {
          model: Toko,
          attributes: ["id_toko","nama_toko", "kontak_toko"],
        },
      ],
    });
    console.log(product);
    if(product){
      return res.status(201).json(product);
    }else{
      return res.status(200).json("Product tidak ditemukan!")
    }
  }catch(err){
    return res.status(200).json(err);
  }
}

module.exports.deleteProduct_delete = async function (req, res) {
  try {
    await Product.destroy({where:{id_barang: req.params.id_barang}});
    res.status(201).json("Barang berhasil dihapus");
  } catch (err) {
    res.status(400).json(err);
  }
};
