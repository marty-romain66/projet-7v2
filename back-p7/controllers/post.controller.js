const dotenv = require("dotenv");
const Post = require("../models").Post;
const User = require("../models").User;
const Comment = require("../models").Comment;
const Like = require("../models").Like;
const fs = require("fs");
const { QueryTypes } = require("sequelize");

const { sequelize } = require("../models");

dotenv.config();

// Afficher tous les posts (plus récents)
exports.getAllPosts = (req, res) => {
  Post.findAll({

    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: User,
      },
      {
        model: Comment,
        include: {
          model: User,
        },
      },
      {
        model: Like,
      }
    ],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Impossible d'afficher tous les posts", error })
    );
};


// Afficher un post
exports.getOnePost = (req, res) => {
  const id = req.params.id;

  Post.findOne({
    where: {
      id: id,
    },
    include: {
      model: User,
    },
  })
    .then((post) => res.status(200).json(post))
    .catch((error) =>
      res.status(400).json({ message: "Impossible d'afficher ce post", error })
    );
};

// Ajouter un nouveau post
exports.createPost = (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : null,
    userId: req.body.userId,
  };

  Post.create(post)
    .then(() =>
    Post.max("id").then(maxs => {
      console.log(maxs)
      const id = maxs
      res.status(200).json({ message: "Post créé avec succès", id })
    })
     
    )
    .catch((error) =>
      res.status(400).json({ message: "Impossible de créer ce post", error })
    );
};

// Modifier un post
exports.modifyPost = (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  let updatedPost = {
    title: req.body.title,
    content: req.body.content,
  };

  if (req.file) {
    updatedPost["imageUrl"] = `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`;
  }

  Post.update(updatedPost, {
    where: {
      id: id,
      userId: userId,
    },
  })
    .then(() => res.status(200).json({ message: "Post modifié avec succès" }))
    .catch((error) =>
      res.status(400).json({ message: "Impossible de modifier ce post", error })
    );
};

// Supprimer un post par l'utilisateur
exports.deletePost = (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  const userId = req.body.userId;

  Post.findOne({
    where: {
      id: id,
    },
  })
    .then((post) => {
      // Si le post a une image, supprimer l'image du dossier '/images' et supprimer le post
      // Sinon supprimer le post directement
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({
            where: {
              id: id,
              userId: userId,
            },
          })
            .then(() =>
              res.status(200).json({ message: "Post supprimé avec succès" })
            )
            .catch((error) =>
              res
                .status(400)
                .json({ message: "Impossible de supprimer ce post", error })
            );
        });
      } else {
        Post.destroy({
          where: {
            id: id,
            userId: userId,
          },
        })
          .then(() =>
            res.status(200).json({
              message: "Post supprimé avec succès",
            })
          )
          .catch((error) =>
            res
              .status(400)
              .json({ message: "Impossible de supprimer ce post", error })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

// Supprimer un post par l'admin
exports.deletePostByAdmin = (req, res) => {
  const id = req.params.id;

  Post.findOne({
    where: {
      id: id,
    },
  })
    .then((post) => {
      if (post.imageUrl) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({
            where: {
              id: id,
            },
          })
            .then(() =>
              res.status(200).json({ message: "Post supprimé avec succès" })
            )
            .catch((error) =>
              res
                .status(400)
                .json({ message: "Impossible de supprimer ce post", error })
            );
        });
      } else {
        Post.destroy({
          where: {
            id: id,
          },
        })
          .then(() =>
            res.status(200).json({ message: "Post supprimé avec succès" })
          )
          .catch((error) =>
            res
              .status(400)
              .json({ message: "Impossible de supprimer ce post", error })
          );
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
// Afficher post apres ca creation
exports.getPost = (req, res) => 
 {
  console.log("okkkkkkkkkkkkkkkkkkkkkkkkk")
  Post.max("id").then(max => {

    
    const id = req.params.id;
    const limit = req.params.limit;
    const offset = req.params.offset;
    const after = max - id;
    Post.findAll({
      where: {
        id: {
          [Op.gt]: after,
        },
      },
      limit: limit,
      offset: offset,
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: {
            model: User,
          },
        },
        {
          model: Like,
        }
      ],
    })
      .then((posts) =>{ res.status(200).json(posts)
      console
      })
      .catch((error) =>
        res
          .status(400)
          .json({ message: "Impossible d'afficher tous les posts", error })
      );
  
  }
  )
}
 