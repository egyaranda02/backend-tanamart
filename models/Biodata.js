const Sequelize = require("sequelize");
const connection = require("../connection");


const Biodata = connection.define("biodata", {
  id_bio: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_user: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "nama tidak boleh kosong",
      },
      notNull:{
        args: true,
        msg:"Nama Tidak boleh kosong"
    },
    },
  },
  alamat: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "alamat tidak boleh kosong",
      },
      notNull:{
        args: true,
        msg:"Alamat Tidak boleh kosong"
    },
    },
  },
  profile_pict: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Harap upload foto profile",
      },
      notNull:{
        args: true,
        msg:"Profile picture Tidak boleh kosong"
    },
    }
  },
  no_hp: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "no hp tidak boleh kosong",
      },
      notNull:{
        args: true,
        msg:"No.HP Tidak boleh kosong"
    },
      isNumeric: {
        args: true,
        msg: "no hp hanya mengandung angka",
      },
    },
  },
});

module.exports = Biodata;
