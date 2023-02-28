# when creating a user check if username/email like this exists in database -> both username and email should be checked in case insensitive manner

1. Finish auth routes
   1. Finish signup route - completed [x]
      1. Finish creating whole user account on signup - User, User Profile, User Settings - completed [x]
   2. Finish login route - completed [x]
   3. Finish logout route - completed [x]
2. Add middleware for secured routes - completed [x]
   1.Create test route to add middleware
   2.Add middleware to selected routes
3. Create tests [x]
4. Add checking if user can do certain action - completed [x]
   1. Check if given user can send the friend request (senderId is the same as one in token) - completed [x]
   2. Check if given user can accept/refuse friend request - (recipientId is the same as one in token) - completed [x]
   3. Check if user can create/edit/delete given post (check userId in token) - completed [x]
   4. Check if user can edit settings/profile etc. and if can delete user (account deletion) - completed [x]
5. Add cors options for frontend support - [x]
6. Add 404 handler - [x]
7. Add library for handling pictures/videos
8. Add validations to data
9. Refactor services - add necessary functions, check if functions should be in other services, add util functions

#To be added

1. Reactions
2. Chat

#To be added (utilities, improvements)

1. Caching (Redis?)
2. Logging
