const Sequelize = require ('sequelize');
const connection = require('../connection');

const OrderList = connection.define('order_list', {
        id_order: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        alamat: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        id_barang: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nama_barang: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        id_toko:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        nama_toko:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        kontak_toko:{
            type: Sequelize.STRING,
            allowNull: false,
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
        },
        status:{
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    }
);

module.exports = OrderList;