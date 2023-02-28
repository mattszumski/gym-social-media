import Post from "../models/Post.js";
import { getUserFriendsIds } from "./FriendService.js";

export const createPost = async (postData) => {
  try {
    const post = await Post.create(postData);
    return post;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getPostById = (postId) => {
  const post = Post.findByPk(postId);
  return post;
};

export const getUserPosts = (userId) => {
  return Post.findAll({
    where: {
      userId,
    },
  });
};

export const getUserFriendsPosts = async (userId) => {
  const userFriendsIds = await getUserFriendsIds(userId);

  return Post.findAll({
    where: {
      userId: [...userFriendsIds],
    },
    order: [["createdAt", "DESC"]],
  });
};

export const editPost = async (postId, postData) => {
  try {
    const post = await getPostById(postId);
    post.update({ ...postData, edited: true });
    return post;
  } catch (error) {
    Promise.reject(error);
  }
};

export const deletePost = async (postId) => {
  const post = await getPostById(postId);
  if (post) {
    return post.destroy();
  }
  return Promise.reject("Post not found");
};

export const checkIfPostBelongsToUser = async (userId, postId) => {
  const post = await getPostById(postId);
  if (postId.userId === userId) {
    return true;
  }

  return false;
};
