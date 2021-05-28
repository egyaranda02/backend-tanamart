require("dotenv").config({ path: "../.env" });
const Biodata = require('../models/Biodata');

const getBiodata = async function(req, res, next){
    try{
        const biodata = await Biodata.findAll({raw:true});
        res.status(201).json(biodata);
        next();
    }catch(err){
        res.status(400).json(err);
        next();
    }
    
};

const checkUser= (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=>{ 
            if(err){
                res.status(400).json(err);
            }else{
                let user = await User.findByPk(decodedToken.id);
                let biodata = await Biodata.findOne({where:{id_user: decodedToken.id}});
                    if(user.role == 1 || biodata.id_user == user.id_user){
                        console.log("Anda memiliki akses!")
                        next();
                    }else{
                        res.status(400).json("Anda tidak memiliki akses!");
                        return;
                    }
            }
        })
    }else{
        res.status(400).json("Harap login terlebih dahulu!")
        return;
    }
}

module.exports = { getBiodata, checkUser };