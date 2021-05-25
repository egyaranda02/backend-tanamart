const Sequelize = require ('sequelize');
const connection = require('../connection');

const Threads = connection.define('threads', {
    id_threads: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    judul_threads: {
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
            },
        }
    },
    isi_threads: {
        type: Sequelize.STRING,
    },
    timestamp: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false   
    },
    foto_threads:{
        type: Sequelize.STRING,
    },
});

module.exports = Threads;