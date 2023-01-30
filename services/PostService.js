import Post from "../models/Post";

export const createPost = async (postData) => {
  try {
    const post = await new Post.create({ ...postData });
    return post;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getPost = (postId) => {
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

export const editPost = async (postId, postData) => {
  try {
    const post = await Post.update({ postId, ...postData });
    return post;
  } catch (error) {
    Promise.reject(error);
  }
};
