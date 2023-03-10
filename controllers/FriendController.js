import {
  addFriend,
  getUserFriendsData,
  removeFriend,
  createFriendRequest,
  removeFriendRequest,
  checkIfUsersAreAlreadyFriends,
  getUserFriendRequests,
  getFriendRequestsSent,
  cancelSentFriendRequest,
  checkIfFriendRequestBetweenUsersExists,
  acceptFriendRequest,
} from "../services/FriendService.js";

export const addFriendRoute = async (req, res) => {
  const userId = req.user;
  const { friendId } = req.body;
  if (!userId || !friendId) {
    return res.sendStatus(400);
  }

  const alreadyFriends = await checkIfUsersAreAlreadyFriends(userId, friendId);

  if (alreadyFriends) {
    return res.status(400).json({ success: false, reason: "Users are already friends" }).send();
  }

  addFriend(userId, friendId)
    .then((result) => {
      res.status(201).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getUserFriendsRoute = (req, res) => {
  const userId = req.user;
  getUserFriendsData(userId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const removeFriendRoute = (req, res) => {
  const userId = req.user;
  const { friendId } = req.body;

  if (!userId || !friendId) {
    return res.sendStatus(400);
  }

  removeFriend(userId, friendId)
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const createFriendRequestRoute = async (req, res) => {
  const userId = req.user;
  const { recipientId } = req.body;
  console.log(recipientId);
  if (!userId || !recipientId) {
    return res.sendStatus(400);
  }

  const alreadyFriends = await checkIfUsersAreAlreadyFriends(userId, recipientId);
  if (alreadyFriends) {
    return res.status(400).json({ success: false, reason: "Users are already friends." }).send();
  }

  const requestAlreadyExists = await checkIfFriendRequestBetweenUsersExists(userId, recipientId);
  if (requestAlreadyExists) {
    return res.status(400).json({ success: false, reason: "Request already exists between users." }).send();
  }

  createFriendRequest(userId, recipientId)
    .then((result) => {
      res.status(201).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};
export const removeFriendRequestRoute = (req, res) => {
  const userId = req.user;
  const { senderId } = req.query;
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

export const getUserFriendRequestsRoute = (req, res) => {
  const userId = req.user;
  getUserFriendRequests(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getFriendRequestsSentRoute = (req, res) => {
  const userId = req.user;
  getFriendRequestsSent(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const acceptFriendRequestRoute = (req, res) => {
  const userId = req.user;
  const { recipientId } = req.body;
  acceptFriendRequest(userId, recipientId)
    .then((result) => {
      return res.sendStatus(200);
    })
    .catch((error) => {
      return res.sendStatus(400);
    });
};

export const cancelFriendRequestRoute = (req, res) => {
  const userId = req.user;
  const { recipientId } = req.body;
  cancelSentFriendRequest(userId, recipientId)
    .then((result) => {
      return res.sendStatus(200);
    })
    .catch((error) => {
      return res.sendStatus(400);
    });
};
