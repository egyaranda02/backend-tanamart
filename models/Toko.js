const Sequelize = require ('sequelize');
const connection = require('../connection');

const Toko = connection.define('toko', {
    id_toko: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nama_toko:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Harap masukkan nama toko"
            },
            notNull:{
                args: true,
                msg:"Nama toko tidak boleh kosong"
            },
        }
    },
    alamat_toko:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Harap masukkan alamat toko"
            },
            notNull:{
                args: true,
                msg:"Alamat Toko tidak boleh kosong"
            },
        }
    },
    kontak_toko:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Harap masukkan kontak toko"
            },
            notNull:{
                args: true,
                msg:"Kontak toko tidak boleh kosong"
            },
        }
    },
    foto_toko:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Harap masukkan foto toko"
            },
            notNull:{
                args: true,
                msg:"Foto Toko tidak boleh kosong"
            },
        }
    },
    deskripsi_toko:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Harap masukkan deskripsi toko"
            },
            notNull:{
                args: true,
                msg:"Deskripsi Toko tidak boleh kosong"
            },
        }
    },
    rekening:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Harap masukkan rekening toko"
            },
            notNull:{
                args: true,
                msg:"Rekening tidak boleh kosong"
            },
        }
    },
}
);

module.exports = Toko;