const Sequelize = require ('sequelize');
const connection = require('../connection');

const Cart = connection.define('cart', {
    id_cart: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_barang: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_toko:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    qty:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Harap masukkan jumlah barang yang tersedia"
            },
            notNull:{
                args: true,
                msg:"Harap masukkan jumlah barang yang tersedia"
            },
        }
    },
    total_price:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Total harga error"
            },
            notNull:{
                args: true,
                msg:"Total harga error"
            },
        }
    }
});

module.exports = Cart;