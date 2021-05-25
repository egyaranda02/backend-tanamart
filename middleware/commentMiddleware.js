require('dotenv').config({path: '../.env'});
const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');
const User = require('../models/User');

const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=>{
            if(err){
                res.status(400).json(err);
            }else{
                let user = await User.findByPk(decodedToken.id);
                let comment = await Comment.findByPk(req.params.id_comment);
                if(comment){
                    if(user.role == 1 || comment.id_user == user.id_user){
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
                            attribute: "Not Found",
                            message: "Comment tidak ditemukan"
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

module.exports = { checkUser };