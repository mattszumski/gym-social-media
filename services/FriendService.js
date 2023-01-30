import Friend from "../models/Friend";
import FriendRequest from "../models/FriendRequest";

export const addFriend = async (userId, friendId) => {
  try {
    const friend = Friend.create({ userId, friendId });
  } catch (error) {
    Promise.reject(error);
  }
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
  const friend = await Friend.findOne({
    where: {
      [Op.or]: [
        { userId: friendId, friendId: userId },
        { userId, friendId },
      ],
    },
  });

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
  const friendRequest = FriendRequest.findOne({
    where: { recipientId: userId, userId: senderId },
  });
  if (friendRequest) {
    friendRequest.destroy();
  }
};
