import { addFriend, getUserFriends, removeFriend, createFriendRequest, removeFriendRequest } from "../services/FriendService.js";

export const addFriendRoute = (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId) {
    return res.sendStatus(400);
  }

  addFriend(userId, friendId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getUserFriendsRoute = (req, res) => {
  const { userId } = req.body;
  getUserFriends(userId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const removeFriendRoute = (req, res) => {
  const { userId, friendId } = req.body;
  removeFriend(userId, friendId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const createFriendRequestRoute = (req, res) => {
  const { userId, senderId } = req.body;
  if (!userId || !senderId) {
    return res.sendStatus(400);
  }
  createFriendRequest(userId, senderId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};
export const removeFriendRequestRoute = (req, res) => {
  const { userId, senderId } = req.body;
  if (!userId || !senderId) {
    return res.sendStatus(400);
  }
  removeFriendRequest(userId, senderId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};
