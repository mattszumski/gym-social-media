import Friend from "../models/Friend.js";
import FriendRequest from "../models/FriendRequest.js";
import { Op } from "sequelize";

export const addFriend = async (userId, friendId) => {
  //TODO: Check if friend is not already added
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
