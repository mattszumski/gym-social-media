import Post from "../models/Post";
import { getUserFriends } from "./FriendService";

export const createPost = async (postData) => {
  try {
    const post = await new Post.create({ ...postData });
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
  const userPosts = Post.findAll({
    where: {
      userId,
    },
  });
};

export const getUserFriendsPosts = async (userId) => {
  //get user friends
  const userFriends = await getUserFriends();
  const userFriendsIds = userFriends.map((friend) => {
    if (friend.userId === userId) {
      return friend.friendId;
    } else {
      return friend.userId;
    }
  });

  //return posts beloning to them
  return Post.findAll({
    where: {
      userId: [...userFriendsIds],
    },
    order: ["createdAt", "DESC"],
  });
};

export const editPost = async (postId, postData) => {
  try {
    const post = await Post.update({ postId, ...postData });
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
