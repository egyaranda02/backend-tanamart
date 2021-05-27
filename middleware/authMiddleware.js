require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        console.log("Harap Login")
    }
}

const checkAdmin = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.status(400).json(err);
            }else{
                let user = await User.findByPk(decodedToken.id);
                if(user.role != 1){
                    res.status(200).json({
                        errors:{
                            attribute: "Authorization",
                            message: "Anda tidak memiliki akses!"
                        }
                    });
                }else{
                    console.log("Anda admin");
                    next();
                }
            }
        });
    }else{
        res.status(200).json({
            errors:{
                attribute: "Authentication",
                message: "Harap login terlebih dahulu!"
            }
        });
    }
}



module.exports = { requireAuth, checkAdmin };