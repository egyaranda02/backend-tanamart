const jwt = require('jsonwebtoken');
const Biodata = require("../models/Biodata");


const requireBiodata = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
            }else{
                const bio = await Biodata.findOne({where: {id_user: decodedToken.id}});
                if(bio){
                    next();
                }else{
                    res.status(200).json({
                        errors:{
                            attribute: "Biodata",
                            message: "Harap isi biodata terlebih dahulu"
                        }
                    });
                }
            }
        })
    }else{
        return res.status(200).json({
            errors:{
                attribute: "Session Expired",
                message: "Harap Login Ulang Session Expired"
            }
        });
    }
}

module.exports = { requireBiodata };