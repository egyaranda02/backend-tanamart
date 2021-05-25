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

module.exports = { getBiodata };