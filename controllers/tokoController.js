const Product = require("../models/Product");
const Toko = require("../models/Toko");
const OrderList = require("../models/OrderList");

module.exports.getTokoDetails = async function (req, res) {
  try {
    const toko = await Toko.findByPk(req.params.id_toko, {
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
        },
      ],
    });
    console.log(toko);
    res.status(201).json(toko);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getTokoByUser = async function (req, res) {
  const id_user = req.params.id_user;
  try {
    const toko = await Toko.findOne({ where: { id_user }, 
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
        },
      ] 
    });
    console.log(toko);
    res.status(201).json(toko);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getToko = async function (req, res) {
  try {
    const toko = await Toko.findAll({ raw: true });
    res.status(201).json(toko);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.addToko_post = async function (req, res) {
  const foto_toko = "foto_toko/" + req.file.filename;
  const {
    id_toko,
    id_user,
    nama_toko,
    alamat_toko,
    kontak_toko,
    deskripsi_toko,
    rekening,
  } = req.body;
  try {
    const foundToko = await Toko.findOne({ where: { id_user } });
    if (!foundToko) {
        const isUnique = await Toko.findOne({where:{nama_toko: req.body.nama_toko}})
    if(isUnique){
      return res.status(400).json({
        errors:{
          attribute: "nama_toko",
          message: "Nama toko sudah digunakan!"
        }
      })
    }
      const toko = await Toko.create({
        id_user,
        nama_toko,
        alamat_toko,
        kontak_toko,
        foto_toko,
        deskripsi_toko,
        rekening,
      });
      res.status(201).json({ toko: toko.id_toko });
    } else {
      const toko = await Toko.findOne({ where: { id_user } });
      try {
        newNama_toko = req.body.nama_toko;
        newAlamat_toko = req.body.alamat_toko;
        newKontak_toko = req.body.kontak_toko;
        newFoto_toko = foto_toko;
        newDeskripsi_toko = req.body.deskripsi_toko;
        newRekening = req.body.rekening;
        toko.update({
          nama_toko: newNama_toko,
          alamat_toko: newAlamat_toko,
          kontak_toko: newKontak_toko,
          foto_toko: newFoto_toko,
          deskripsi_toko: newDeskripsi_toko,
          rekening: newRekening,
        });
        res.status(201).json({ toko: toko.id_toko });
      } catch (error) {
        res.status(400).json(error);
      }
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        msg: err.errors.map((e) => e.message),
      });
    }
  }
};

module.exports.getInvoice = async function (req, res) {
  id_toko = req.params.id_toko;
  const status = 2;
  try{
    const invoice = await OrderList.findAll({where: id_toko, status}, {
      include: [
        {
          model: Biodata,
          attributes: [
            "nama",
            "alamat",
            "no_hp"
          ],
        },
      ],
    });
    res.status(200).json(invoice);
  }catch(err){
    res.status(400).json(err);
  }
}
