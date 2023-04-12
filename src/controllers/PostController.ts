import { Request, Response } from "express";
import { createPost, deletePost, editPost, getPostById, getUserPosts, getUserFriendsPosts, checkIfPostBelongsToUser, addPostComment, getPostComments } from "../services/PostService.js";
import { insertPostPhotos } from "./FilesController.js";
import ExtendedIncomingFile from "../types/ExtendedIncomingFile.js";

export const createPostRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  let containFiles = false;
  if (req.files && (req.files.length as number) > 0) {
    containFiles = true;
  }

  const files = req.files as unknown as ExtendedIncomingFile[];

  if (!req?.body?.text && !containFiles) {
    return res.status(400).json({ success: false, reason: "No data" });
  }
  const text = req?.body?.text || "";

  createPost({ userId, text })
    .then((result) => {
      if (result) {
        if (containFiles) {
          insertPostPhotos(userId, result.id, files);
        }

        return res.status(201).json(result);
      }
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};

export const getPostRoute = (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
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

export const getPostForUserRoute = (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
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

export const getPostForUserDashboardRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
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

export const editPostRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  const postId = parseInt(req.params.postId);
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

export const deletePostRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  const postId = parseInt(req.params.postId);
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

export const addPostCommentRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
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

export const getPostCommentsRoute = (req: Request, res: Response) => {
  let { postId } = req.query;

  if (!postId) {
    return res.sendStatus(400);
  }

  if (Array.isArray(postId)) {
    return res.sendStatus(400);
  }

  getPostComments(parseInt(postId as string))
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json(error);
    });
};

export const editPostCommentRoute = (req: Request, res: Response) => {};
export const deletePostCommentRoute = (req: Request, res: Response) => {};
