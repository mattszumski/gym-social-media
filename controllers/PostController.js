import { createPost, deletePost, editPost, getPostById, getUserPosts } from "../services/PostService.js";

export const createPostRoute = (req, res) => {
  createPost({ userId: req.user, ...req.body })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

export const getPostRoute = (req, res) => {
  const postId = req.params.postId;
  getPostById(postId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getPostForUserRoute = (req, res) => {
  const userId = req.params.userId;
  getUserPosts(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getPostForUserDashboardRoute = (req, res) => {
  const userId = req.user;
  if (!userId) {
    res.sendStatus(400);
  }
  getUserPosts(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const editPostRoute = (req, res) => {
  //TODO: Add checking if user can edit given post
  const postId = req.params.postId;
  editPost(postId, req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const deletePostRoute = (req, res) => {
  //TODO: Add checking if user can delete given post
  const postId = req.params.postId;
  deletePost(postId);
  res.sendStatus(200);
};
