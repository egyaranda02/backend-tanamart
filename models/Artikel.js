const Sequelize = require ('sequelize');
const connection = require('../connection');


const Artikel = connection.define('artikel', {
    id_artikel: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    judul_artikel: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Judul tidak boleh kosong"
            },
            notNull:{
                args: true,
                msg:"Judul tidak boleh kosong"
            }
        }
    },
    isi_artikel: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Isi artikel tidak boleh kosong"
            },
            notNull:{
                args: true,
                msg:"Isi artikel tidak boleh kosong"
            }
        }
    },
    foto_artikel: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        notEmpty: {
            args: true,
            msg: "Harap upload foto artikel",
        },
        notNull:{
            args: true,
            msg:"Foto artikel Tidak boleh kosong"
        },
        }
    },
    timestamp: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
        
    }
});

module.exports = Artikel;