# when creating a user check if username/email like this exists in database -> both username and email should be checked in case insensitive manner

1. Finish auth routes
   1. Finish signup route - completed [x]
      1. Finish creating whole user account on signup - User, User Profile, User Settings - completed [x]
   2. Finish login route - completed [ ]
   3. Finish logout route - completed [ ]
2. Add middleware for secured routes - completed [ ]
3. Add checking if user can do certain action - completed [ ]
   1. Check if given user can send the friend request (senderId is the same as one in token) - completed [ ]
   2. Check if given user can accept/refuse friend request - (recipientId is the same as one in token) - completed [ ]
   3. Check if user can create/edit/delete given post (check userId in token) - completed [ ]
   4. Check if user can edit settings/profile etc. and if can delete user (account deletion) - completed [ ]
4. Add cors options for frontend support
5. Add 404 handler
6. Add library for handling pictures/videos
7. Add validations to data
8. Refactor services - add necessary functions, check if functions should be in other services, add util functions

#To be added

1. Reactions
2. Chat
