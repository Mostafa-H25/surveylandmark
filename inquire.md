# Inquire

1. Every user on the dashboard is part of survey landmark? [ super admin, admin, member ] ==> YES
2. What are the department and projects field in dashboard users? ==> Admin Dashboard users are responsible for different projects, but they don't need a department field.
3. What is the financial limit field in dashboard users? ==> Remove
4. What is the building and floor fields in each department?

## Backend

1. user/me -> user role?
2. verify token?

3. upload profile image
   ```
   {
       "error": "EROFS: read-only file system, open 'uploads/userImages/1756983424564-921462243-login-bg.jpg'",
       "stack": "Error: EROFS: read-only file system, open 'uploads/userImages/1756983424564-921462243-login-bg.jpg'"
   }
   ```
4. 2-factor auth ?

5. getusers endpoint
   a. user projects not project. spelling
   b. user permission. spelling
6. where is get projects endpoint?

7. Profile picture endpoint not working.
8. User Invite.
9. user/me -> Id
