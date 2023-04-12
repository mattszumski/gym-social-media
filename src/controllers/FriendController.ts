import { Request, Response } from "express";
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

export const addFriendRoute = async (req: Request, res: Response) => {
  const userId = req.user as number;
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

export const getUserFriendsRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  getUserFriendsData(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getFriendsByUserIdRoute = (req: Request, res: Response) => {
  const { userId } = req.params;
  getUserFriendsData(parseInt(userId))
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const removeFriendRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
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

export const createFriendRequestRoute = async (req: Request, res: Response) => {
  const userId = req.user as number;
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
export const removeFriendRequestRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  const { senderId } = req.query;
  if (!userId || !senderId) {
    return res.sendStatus(400);
  }

  //TODO: One function for checking from http body/query etc to number
  removeFriendRequest(userId, parseInt(senderId as string))
    .then((result) => {
      res.status(200).json(result).send();
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getUserFriendRequestsRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  getUserFriendRequests(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const getFriendRequestsSentRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  getFriendRequestsSent(userId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

export const acceptFriendRequestRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  const { recipientId } = req.body;
  acceptFriendRequest(userId, recipientId)
    .then((result) => {
      return res.sendStatus(200);
    })
    .catch((error) => {
      return res.sendStatus(400);
    });
};

export const cancelFriendRequestRoute = (req: Request, res: Response) => {
  const userId = req.user as number;
  const { recipientId } = req.body;
  cancelSentFriendRequest(userId, recipientId)
    .then((result) => {
      return res.sendStatus(200);
    })
    .catch((error) => {
      return res.sendStatus(400);
    });
};
