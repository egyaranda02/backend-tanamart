require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');
const Toko = require('../models/Toko');
const User = require('../models/User');
const Product = require('../models/Product');

const checkUserDelete = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=>{ 
            if(err){
                res.status(400).json(err);
                
            }else{
                let user = await User.findByPk(decodedToken.id);
                let toko = await Toko.findOne({where:{id_user: decodedToken.id}});
                let product = await Product.findByPk(req.params.id_barang);
                if(toko || user.role == 1){
                    if(user.role == 1 || toko.id_toko == product.id_toko){
                        console.log("Anda memiliki akses!")
                        next();
                    }else{
                        res.status(200).json({
                            errors:{
                                attribute: "Authorization",
                                message: "Anda tidak memiliki akses!"
                            }
                        });
                        return;
                    }
                }else{
                    res.status(200).json({
                        errors:{
                            attribute: "Authorization",
                            message: "Anda tidak memiliki akses!"
                        }
                    });
                    return;
                }
            }
        })
    }else{
        res.status(200).json({
            errors:{
                attribute: "Authentication",
                message: "Harap login terlebih dahulu"
            }
        });
        return;
    }
}

const checkUserEdit = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=>{ 
            if(err){
                res.status(400).json(err);
            }else{
                let user = await User.findByPk(decodedToken.id);
                let toko = await Toko.findOne({where:{id_user: decodedToken.id}});
                let product = await Product.findByPk(req.body.id_barang);
                if(toko){
                    if(user.role == 1 || toko.id_toko == product.id_toko){
                        console.log("Anda memiliki akses!")
                        next();
                    }else{
                        res.status(200).json({
                            errors:{
                                attribute: "Authorization",
                                message: "Anda tidak memiliki akses!"
                            }
                        });
                    }
                }else{
                    res.status(200).json({
                        errors:{
                            attribute: "Authorization",
                            message: "Anda tidak memiliki akses!"
                        }
                    });
                }
            }
        })
    }else{
        return res.status(200).json({
            errors:{
                attribute: "Authentication",
                message: "Harap Login Ulang"
            }
        });
    }
}

module.exports = { checkUserDelete, checkUserEdit };