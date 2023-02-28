import Friend from "../models/Friend.js";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import { BelongsTo, Op } from "sequelize";

export const addFriend = async (userId, friendId) => {
  try {
    const friend = Friend.create({ userId, friendId });
  } catch (error) {
    Promise.reject(error);
  }
};

const findFriend = (userId, friendId) => {
  return Friend.findOne({
    where: {
      [Op.or]: [
        { userId: friendId, friendId: userId },
        { userId, friendId },
      ],
    },
  });
};

export const getUserFriends = async (userId) => {
  const friends = Friend.findAll({
    where: {
      [Op.or]: [{ userId }, { friendId: userId }],
    },
  });

  return friends;
};

export const removeFriend = async (userId, friendId) => {
  const friend = await findFriend(userId, friendId);
  if (friend) {
    friend.destroy();
  }
};

export const createFriendRequest = async (userId, recipientId) => {
  try {
    const friendRequest = FriendRequest.create({ userId, recipientId });
  } catch (error) {
    Promise.reject(error);
  }
};

export const getUserFriendRequests = (userId) => {
  return FriendRequest.findAll({
    include: [
      {
        model: User,
        required: true,
        attributes: ["id", "username"],
        association: new BelongsTo(FriendRequest, User, { foreignKey: "recipientId", targetKey: "id", constraints: false }),
      },
    ],
    where: { recipientId: userId },
  });
};
export const getFriendRequestsSent = (userId) => {
  return FriendRequest.findAll({
    include: [
      {
        model: User,
        required: true,
        attributes: ["id", "username"],
        association: new BelongsTo(FriendRequest, User, { foreignKey: "recipientId", targetKey: "id", constraints: false }),
      },
    ],
    where: { userId },
  });
};

export const removeFriendRequest = async (userId, senderId) => {
  const friendRequest = await FriendRequest.findOne({
    where: { recipientId: userId, userId: senderId },
  });
  if (friendRequest) {
    friendRequest.destroy();
  }
};

export const checkIfUsersAreAlreadyFriends = async (userId, friendId) => {
  const friend = await findFriend(userId, friendId);
  if (friend) {
    return true;
  }
  return false;
};

export const getUserFriendsIds = async (userId) => {
  const userFriends = await getUserFriends(userId);
  return userFriends.map((friend) => {
    if (friend.userId === userId) {
      return friend.friendId;
    } else {
      return friend.userId;
    }
  });
};

export const getUserFriendsData = async (userId) => {
  const userFriendsIds = await getUserFriendsIds(userId);
  return User.findAll({
    where: {
      id: [...userFriendsIds],
    },
    attributes: ["id", "username", "fullname", "firstname", "lastname"],
    include: [{ model: UserProfile, attributes: ["city", "gym", "about"] }],
    order: [["createdAt", "DESC"]],
  });
};
