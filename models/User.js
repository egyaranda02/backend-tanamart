const Sequelize = require ('sequelize');
const connection = require('../connection');
const bcrypt = require('bcrypt');

const User = connection.define('user', {
    id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Email tidak boleh kosong"
            },
            notNull:{
                args: true,
                msg:"Email tidak boleh kosong"
            },
            isEmail:{
                args:true,
                msg:'Masukkan email yang valid'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args:true,
                msg:"Password Error: Password Tidak boleh kosong"
            },
            notNull:{
                args: true,
                msg:"Password Error: Password Tidak boleh kosong"
            },
            len:{
                args:[6,50],
                msg:"Password Error: Password length is not in range"
            }
        } 
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    

});

User.associate = function(models){
    User.hasMany(models.Product, {foreignKey: "id_user", as: "products"})
}

User.beforeCreate(async (user)=>{
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    user.password = encryptedPassword;
});

User.beforeValidate(async(user)=>{
    user.email = user.email.toLowerCase();
});

module.exports = User;