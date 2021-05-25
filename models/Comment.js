const Sequelize = require ('sequelize');
const connection = require('../connection');


const Comment = connection.define('comment', {
    id_comment: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_threads: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isi_comment: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Isi tidak boleh kosong"
            },
            notNull:{
                args: true,
                msg:"Isi tidak boleh kosong"
            },
        }
    },
    timestamp: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
        
    }
});

module.exports = Comment;