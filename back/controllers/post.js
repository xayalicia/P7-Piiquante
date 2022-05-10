const db = require("../models");
// const { Op } = require('sequelize');
const fs = require('fs');
const { User } = require("../models");

// Fonction création publication
exports.createPost = (req, res, next) => {
    const postObject = req.body;
    db.Post.create({
            title: postObject.title,
            // postImg: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
            content: JSON.parse(postObject.content),
        })
        .then(() => res.status(201).json({
            message: 'Publication enregistrée'
        }))
        .catch(error => res.status(400).json({ error }));
};

// Fonction récupération de toutes les publications
exports.getPost = (req, res, next) => {
    db.Post.findAll({
            // On y inclue les informations de l'user
            include: {
                model: User,
                attributes: ['first_name', 'last_name', 'imageUrl'],
            },
            // Les résulats sont classés par ordre décroissant des dates
            // order: [['createdAt', 'DESC']],
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error }));
};

// Fonction suppression publication
// exports.deletePost = (req, res) => {
//     db.Post.findOne({ where: { id: req.params.id } })
//         .then(post => {
//             // Si la publication comprend une image, elle est supprimée du serveur
//             if (post.imageUrl != null) {
//                 const filename = post.imageUrl.split('/images/posts/')[1];
//                 fs.unlink(`images/posts/${filename}`, (err) => {
//                     if (err) throw err;
//                 })
//             };
//             // La publication est supprimée de la DB
//             db.Post.destroy({ where: { id: req.params.id } })
//                 .then(() => res.status(201).json({ message: "Publication supprimée" }))
//                 .catch(error => res.status(500).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
// };


// Fonction like/dislike