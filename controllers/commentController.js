const Comment = require('../models/Comment');


module.exports.getCommentDetails = async function(req, res){
    try{
        const comment = await Comment.findByPk(req.params.id_comment);
        console.log(comment);
        res.status(201).json(comment);
    }catch(err){
        res.status(400).json(err);
    }
};
module.exports.getCommentByThreads = async function (req, res) {
    const id_threads = req.params.id_threads;
    try {
        const comment = await Comment.findAll({ where: { id_threads } });
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
    };
    
module.exports.getComment= async function(req, res){
    try {
        const comment =await Comment.findAll({raw:true});
    res.status(201).json(comment);
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports.addComment_post = async function(req, res){
    const {id_user, id_threads, isi_comment} = req.body;
    try{
        const comment = await Comment.create( {id_user, id_threads, isi_comment})
        res.status(201).json({comment: comment.id_comment});
    }catch(err){
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
            success: false,
            msg: err.errors.map(e => e.message)
            });
        }
    }
};

module.exports.editComment_post = async function(req, res){
    const id_comment = req.body.id_comment;
    try{
        const comment = await Comment.findByPk(id_comment);
        try{
            newIsi_comment = req.body.isi_comment;
            comment.update({isi_comment: newIsi_comment})
            res.status(201).json("comment updated!")
        }catch(error){
            res.status(400).json(error);
        }
    }catch(err){
        console.log(err);
    }
};

module.exports.deleteComment_delete = async function (req, res) {
    try {
        await Comment.destroy({where:{id_comment: req.params.id_comment}});
        res.status(201).json("Comment berhasil dihapus");
    } catch (err) {
        res.status(400).json(err);
    }
};

