import Friend from "../models/Friend.js";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import UserProfile from "../models/UserProfile.js";
import File from "../models/File.js";
import { BelongsTo, Op } from "sequelize";

export const addFriend = async (userId: number, friendId: number) => {
  try {
    const friend = Friend.create({ userId, friendId });
  } catch (error) {
    Promise.reject(error);
  }
};

const findFriend = (userId: number, friendId: number) => {
  return Friend.findOne({
    where: {
      [Op.or]: [
        { userId: friendId, friendId: userId },
        { userId, friendId },
      ],
    },
  });
};

export const getUserFriends = async (userId: number) => {
  const friends = Friend.findAll({
    where: {
      [Op.or]: [{ userId }, { friendId: userId }],
    },
  });

  return friends;
};

export const removeFriend = async (userId: number, friendId: number) => {
  const friend = await findFriend(userId, friendId);
  if (friend) {
    friend.destroy();
  }
};

export const createFriendRequest = async (userId: number, recipientId: number) => {
  try {
    const friendRequest = FriendRequest.create({ userId, recipientId });
  } catch (error) {
    Promise.reject(error);
  }
};

export const getUserFriendRequests = (userId: number) => {
  return FriendRequest.findAll({
    include: [
      {
        model: User,
        required: true,
        attributes: ["id", "username"],
        association: new BelongsTo(FriendRequest, User, { foreignKey: "userId", targetKey: "id", constraints: false }),
      },
    ],
    where: { recipientId: userId },
  });
};
export const getFriendRequestsSent = (userId: number) => {
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

export const removeFriendRequest = async (userId: number, senderId: number) => {
  const friendRequest = await FriendRequest.findOne({
    where: { recipientId: userId, userId: senderId },
  });
  if (friendRequest) {
    friendRequest.destroy();
  }
};

export const checkIfUsersAreAlreadyFriends = async (userId: number, friendId: number) => {
  const friend = await findFriend(userId, friendId);
  if (friend) {
    return true;
  }
  return false;
};

export const getUserFriendsIds = async (userId: number) => {
  const userFriends = await getUserFriends(userId);
  return userFriends.map((friend) => {
    if (friend.userId == userId) {
      return friend.friendId;
    } else {
      return friend.userId;
    }
  });
};

export const getUserFriendsData = async (userId: number) => {
  const userFriendsIds = await getUserFriendsIds(userId);
  console.log(userId);
  console.log(userFriendsIds);
  return User.findAll({
    where: {
      id: [...userFriendsIds],
    },
    attributes: ["id", "username", "fullname", "firstname", "lastname"],
    include: [
      {
        model: UserProfile,
        attributes: ["city", "gym", "about"],
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
    order: [["createdAt", "DESC"]],
  });
};

export const acceptFriendRequest = async (userId: number, recipientId: number) => {
  return addFriend(userId, recipientId)
    .then(async (result) => {
      const friendRequest = await FriendRequest.findOne({
        where: { recipientId: userId, userId: recipientId },
      });

      if (friendRequest) {
        friendRequest.destroy();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const cancelSentFriendRequest = async (userId: number, recipientId: number) => {
  const friendRequest = await FriendRequest.findOne({
    where: { userId, recipientId },
  });
  if (friendRequest) {
    friendRequest.destroy();
  }
};

export const checkIfFriendRequestBetweenUsersExists = async (userId: number, recipientId: number) => {
  let requestSent = checkIfUserSentFriendRequestToOther(userId, recipientId);
  let requestReceived = checkIfUserReceivedFriendRequestFromOther(userId, recipientId);

  return requestSent || requestReceived;
};

export const checkIfUserSentFriendRequestToOther = async (userId: number, recipientId: number) => {
  const result = await FriendRequest.findOne({
    where: {
      userId,
      recipientId,
    },
  });

  if (result) {
    return true;
  }
  return false;
};

export const checkIfUserReceivedFriendRequestFromOther = async (userId: number, recipientId: number) => {
  const result = await FriendRequest.findOne({
    where: {
      recipientId: userId,
      userId: recipientId,
    },
  });

  if (result) {
    return true;
  }
  return false;
};
