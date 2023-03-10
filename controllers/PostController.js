import { createPost, deletePost, editPost, getPostById, getUserPosts, getUserFriendsPosts, checkIfPostBelongsToUser } from "../services/PostService.js";

export const createPostRoute = (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ success: false, reason: "No data" });
  }

  createPost({ userId: req.user, ...req.body })
    .then((result) => {
      if (result) {
        return res.status(201).json(result);
      }
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

export const getPostRoute = (req, res) => {
  const postId = req.params.postId;
  getPostById(postId)
    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(404).json({ success: false, reason: "Not found" });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getPostForUserRoute = (req, res) => {
  const userId = req.params.userId;
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

export const getPostForUserDashboardRoute = (req, res) => {
  const userId = req.user;
  if (!userId) {
    res.sendStatus(400);
  }
  getUserFriendsPosts(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const editPostRoute = (req, res) => {
  const userId = req.user;
  const postId = req.params.postId;
  const isUserPost = checkIfPostBelongsToUser(userId, postId);
  if (!isUserPost) {
    return res.status(403).json({ success: false, reason: "Access denied" });
  }

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
  const userId = req.user;
  const postId = req.params.postId;
  const isUserPost = checkIfPostBelongsToUser(userId, postId);
  if (!isUserPost) {
    return res.status(403).json({ success: false, reason: "Access denied" });
  }
  deletePost(postId)
    .then((result) => {
      return res.status(204).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};
