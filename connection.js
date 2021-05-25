const Sequelize = require('sequelize');
require('dotenv').config({path: './.env'});

// Koneksi db sequelize
const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false 
        }
    },
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

// cek koneksi sequelize
conn.authenticate()
    .then( ()=> console.log('Database Connected') )
    .catch( err => console.log(err) )

module.exports = conn;