import { BelongsTo, HasMany } from "sequelize";
import File from "../models/File.js";
import Post from "../models/Post.js";
import PostComments from "../models/PostComments.js";
import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import { getUserFriendsIds } from "./FriendService.js";

export const createPost = async (postData) => {
  try {
    return Post.create(postData);
  } catch (error) {
    Promise.reject(error);
  }
};

export const getPostById = (postId) => {
  const post = Post.findByPk(postId);
  return post;
};

export const getUserPosts = (userId) => {
  return getPostsByUserIds([userId]);
};

export const getUserFriendsPosts = async (userId) => {
  const userFriendsIds = await getUserFriendsIds(userId);
  return getPostsByUserIds([userId, ...userFriendsIds]);
};

export const getPostsByUserIds = async (userIds) => {
  if (!Array.isArray(userIds)) {
    return Promise.reject("Invalid function argument");
  }

  return Post.findAll({
    include: [
      {
        model: User,
        required: true,
        attributes: ["id", "username", "firstname", "lastname"],
        include: [
          {
            model: UserProfile,
            required: true,
            attributes: ["profilePhotoId"],
            include: [
              {
                model: File,
                required: false,
                attributes: ["storedName", "path"],
                association: new BelongsTo(UserProfile, File, { foreignKey: "profilePhotoId", targetKey: "id", constraints: false }),
              },
            ],
          },
        ],
      },
      {
        model: File,
        required: false,
        attributes: ["id", "storedName", "path"],
        association: new HasMany(Post, File, { foreignKey: "postId", targetKey: "id", constraints: false }),
      },
      {
        model: PostComments,
        required: false,
        attributes: ["id", "postId", "text", "userId"],
        order: [["createdAt", "ASC"]],
        include: [
          {
            model: User,
            required: false,
            attributes: ["id", "username", "firstname", "lastname"],
            association: new BelongsTo(PostComments, User, { foreignKey: "userId", targetKey: "id", constraints: false }),
            include: [
              {
                model: UserProfile,
                required: true,
                attributes: ["profilePhotoId"],
                include: [
                  {
                    model: File,
                    required: false,
                    attributes: ["storedName", "path"],
                    association: new BelongsTo(UserProfile, File, { foreignKey: "profilePhotoId", targetKey: "id", constraints: false }),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    where: {
      userId: [...userIds],
    },
    attributes: ["id", "text", "createdAt"],
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

export const addPostComment = (userId, postId, text) => {
  return PostComments.create({ userId, PostId: postId, text });
};

export const getPostComments = (postId) => {
  return PostComments.findAll({ where: { postId }, attributes: ["id", "postId", "text"], order: [["createdAt", "ASC"]] });
};
