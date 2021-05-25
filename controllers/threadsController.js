const Threads = require('../models/Threads');
const Comment = require('../models/Comment');

module.exports.getThreadsDetails = async function (req, res) {
    try {
        const threads = await Threads.findByPk(req.params.id_threads, {
            include: [
                {
                    model: Comment,
                    attributes: [
                        "id_comment",
                        "id_threads",
                        "isi_comment",
                    ],
                },
            ],
        });
        console.log(threads);
        res.status(201).json(threads);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.getThreadsByUser = async function (req, res) {
    const id_user = req.params.id_user;
    try {
        const threads = await Threads.findOne({ where: { id_user } });
        console.log(toko);
        res.status(201).json(threads);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.getThreads = async function (req, res) {
    try {
        const threads = await Threads.findAll({ raw: true });
        res.status(201).json(threads);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports.addThreads_post = async function (req, res) {
    if(!req.file){
        const { id_user, judul_threads, isi_threads } = req.body;
        try {
            const threads = await Threads.create({ 
                id_user, 
                judul_threads, 
                isi_threads, 
            })
            res.status(201).json({ threads: threads.id_threads });
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    msg: err.errors.map(e => e.message)
                });
            }
        }
    }
    else{
        const foto_threads = "foto_threads/"+req.file.filename;
        const { id_user, judul_threads, isi_threads } = req.body;
        try {
            const threads = await Threads.create({ 
                id_user, 
                judul_threads, 
                isi_threads, 
                foto_threads 
            })
            res.status(201).json({ threads: threads.id_threads });
        } catch (err) {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    success: false,
                    msg: err.errors.map(e => e.message)
                });
            }
        }
    }
    
};

module.exports.editThreads_post = async function (req, res) {
    if(!req.file){
        const id_threads = req.body.id_threads;
        try {
            const threads = await Threads.findByPk(id_threads);
            try {
                newJudul_threads = req.body.judul_threads;
                newIsi_threads = req.body.isi_threads;
                threads.update({ 
                    judul_threads: newJudul_threads, 
                    isi_threads: newIsi_threads, 
                })
                res.status(201).json("threads updated!")
            } catch (error) {
                res.status(400).json(error);
            }
        } catch (err) {
            console.log(err);
        }
    }
    else{
        const foto_threads = "foto_threads/"+req.file.filename;
        const id_threads = req.body.id_threads;
        try {
            const threads = await Threads.findByPk(id_threads);
            try {
                newJudul_threads = req.body.judul_threads;
                newIsi_threads = req.body.isi_threads;
                newFoto_threads = foto_threads;
                threads.update({ 
                    judul_threads: newJudul_threads, 
                    isi_threads: newIsi_threads, 
                    foto_threads: newFoto_threads 
                })
                res.status(201).json("threads updated!")
            } catch (error) {
                res.status(400).json(error);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
};

module.exports.deleteThreads_delete = async function (req, res) {
    try {
        await Threads.destroy({where:{id_threads: req.params.id_threads}});
        res.status(201).json("Threads berhasil dihapus");
    } catch (err) {
        res.status(400).json(err);
    }
};

