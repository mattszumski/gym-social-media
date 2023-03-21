[] userTest: Find the best way to test deleting the user profile
[x] UserProfileModel: fix typo to - interests and add them to tests
[x] User deletion: change flow of userProfile/userSettings deletion - these should delete with userDeletion and there should be no way to delete them separately
[] UserSettings: create list/validators of acceptable values (example: language can only be certain codes like en, pl etc.)
[x] authTest: Delete user after creation and testing
[x] FriendService: Add Check to determine if friend is not already added
[x] Platform: Create setup file which will drop and create tables and input test/default data
[x] Adding videos and photos: create middleware and modify post functions when frontend part will be ready
[] Videos part to be added in the future ^
[x] Create route for accepting friend request - it should add friend and delete current friend request
[x] Check if friend request already exists before creating (avoiding the duplicates)
[x] Create route to cancel the friend request sent by user
[] Improve token auth: add refresh token | add token blacklist | add token field in user?
[] Create more sophisticated method to check if the uploaded file type is accepted (from UserController)

To check if still applicable:
[x] (Completed previously) when creating a user check if username/email like this exists in database -> both username and email should be checked in case insensitive manner
