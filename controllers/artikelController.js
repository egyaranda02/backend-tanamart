require("dotenv").config({ path: "../.env" });
const User = require('../models/User');
const Artikel = require('../models/Artikel');
const imgbbUploader = require("imgbb-uploader");
const { response } = require('express');

module.exports.getArtikelDetails = async function(req, res){
    try{
        const artikel = await Artikel.findByPk(req.params.id_artikel);
        console.log(artikel);
        res.status(201).json(artikel);
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports.getArtikel= async function(req, res){
    try {
        const artikel =await Artikel.findAll({raw:true});
    res.status(201).json(artikel);
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports.addArtikel_post = async function(req, res){
    const {id_user, judul_artikel, isi_artikel} = req.body;
    imgbbUploader(process.env.IMGBB_API, "./uploads/foto_artikel/"+req.file.filename)
    .then(async(response)=>{
        const foto_artikel = response.display_url;
        const artikel = await Artikel.create({
            id_user, 
            judul_artikel, 
            isi_artikel,
            foto_artikel
        })
        res.status(201).json({artikel: artikel.id_artikel});
    })
    .catch((err)=>{
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
            success: false,
            msg: err.errors.map(e => e.message)
            });
        }
    })
};

module.exports.editArtikel_post = async function(req, res){

    const id_artikel = req.body.id_artikel;
    imgbbUploader(process.env.IMGBB_API, "./uploads/foto_artikel/"+req.file.filename)
    .then(async(response)=>{
        const foto_artikel = response.display_url;
        const artikel = await Artikel.findByPk(id_artikel);
        try{
            newJudul_Artikel = req.body.judul_artikel;
            newIsi_artikel = req.body.isi_artikel;
            newFoto_artikel = foto_artikel
            artikel.update({
            judul_artikel: newJudul_Artikel, 
            isi_artikel: newIsi_artikel,
            foto_artikel: newFoto_artikel
        })
            res.status(201).json("artikel updated!")
        }catch(error){
            res.status(400).json(error);
        }
    })
    .catch((err)=>{
        console.log(err);
    })
};

module.exports.deleteArtikel_delete = async function (req, res) {
    try {
        await Artikel.destroy({where:{id_artikel: req.params.id_artikel}});
        res.status(201).json("Artikel berhasil dihapus");
    } catch (err) {
        res.status(400).json(err);
    }
};

