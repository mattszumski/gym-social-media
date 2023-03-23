import { createPost, deletePost, editPost, getPostById, getUserPosts, getUserFriendsPosts, checkIfPostBelongsToUser, addPostComment, getPostComments } from "../services/PostService.js";
import { insertPostPhotos } from "./FilesController.js";

export const createPostRoute = (req, res) => {
  if (!req?.body?.text && !req?.files?.length) {
    return res.status(400).json({ success: false, reason: "No data" });
  }
  const text = req?.body?.text || "";

  createPost({ userId: req.user, text })
    .then((result) => {
      if (result) {
        if (req?.files?.length) {
          insertPostPhotos(req.user, result.id, req.files);
        }

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

export const addPostCommentRoute = (req, res) => {
  const userId = req.user;
  const { postId, text } = req.body;
  if (!postId || !text) {
    return res.sendStatus(400);
  }

  addPostComment(userId, postId, text)
    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json(error);
    });
};

export const getPostCommentsRoute = (req, res) => {
  const { postId } = req.query;

  if (!postId) {
    return res.sendStatus(400);
  }

  getPostComments(postId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json(error);
    });
};

export const editPostCommentRoute = (req, res) => {};
export const deletePostCommentRoute = (req, res) => {};
