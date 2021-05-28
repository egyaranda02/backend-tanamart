const Biodata = require("../models/Biodata");
const imgbbUploader = require("imgbb-uploader");


module.exports.getBiodataDetails = async function (req, res) {
  try {
    const biodata = await Biodata.findByPk(req.params.id_bio);
    console.log(biodata);
    res.status(201).json(biodata);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getBiodataByUser = async function (req, res) {
  const id_user = req.params.id_user
  try {
    const biodata = await Biodata.findOne({where: {id_user}});
    console.log(biodata);
    res.status(201).json(biodata);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getBiodata = async function (req, res) {
  try {
    const biodata = await Biodata.findAll({ raw: true });
    res.status(201).json(biodata);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.addBiodata_post = async function (req, res) {
  const { id_user, nama, alamat, no_hp } = req.body;
  imgbbUploader(proccess.env.IMGBB_API, "./uploads/profile_pict/"+req.file.filename)
  .then(async(response)=>{
    const profile_pict = response.display_url;
    const foundBiodata = await Biodata.findOne({ where: { id_user } });
    if (!foundBiodata) {
      const biodata = await Biodata.create({
        id_user,
        nama,
        alamat,
        profile_pict,
        no_hp,
      });
      res.status(201).json({ bio: biodata.id_bio });
    } else {
      const biodata = await Biodata.findOne({ where: { id_user } });
      try {
        newNama = req.body.nama;
        newAlamat = req.body.alamat;
        newProfile_pict = profile_pict;
        newNo_hp = req.body.no_hp;
        biodata.update({
          nama: newNama,
          alamat: newAlamat,
          profile_pict: newProfile_pict,
          no_hp: newNo_hp,
        });
        res.status(201).json({ bio: biodata.id_bio });
      } catch (error) {
        res.status(400).json(error);
      }
    }
  })
  .catch((err)=>{
    if (err.name === "SequelizeValidationError") {
      return res.status(400).json({
        success: false,
        msg: err.errors.map((e) => e.message),
      });
    }
  })
};
