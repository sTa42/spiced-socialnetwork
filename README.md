# **spiced-socialnetwork**
## **Noteworthy technologies used**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
## **Description**
This social network project was the fourth major project I did during my training at **[Spiced Academy](https://www.spiced-academy.com/)**.  
It is a basic social network, where you can connect with other users and chat with them.  

While working on the project, I learned deeply about the fundamentals about **React** and **Redux**. Also, in the later stages of the project, I got to work with **Socket.IO**.
## **Features**
- ### **Auth**
    - Register a new user account
    - Login with existing user credentials
    - Reset password with a time-sensitive token
    - Logout
- ### **User profile data**
    - Set a bio, which is readable by other users
    - Upload a profile picture, which is viewable by other users
- ### **Friends and other users**
    - Search for other users
        - Display that shows users who are currently online
        - Badge that indicates how many other users are currently online
    - Send a friend request
    - Accept a friend request
    - Reject a friend request
    - Decline a friend request
    - End a existing friendship
    - New friend request notification
    - Badge that indicates how many friendship requests the user currently has open
- ### **Interactions between users**   
    - Global chat for all others
    - Private chat with other users, if they are friends
## **Preview**
*to be added*

## **Setup and start**
- ### **Intall node modules**
    Open your terminal, navigate to your project directory and type
    ````console
    npm install
    ````
- ### **Configure PostgreSQL connection**
    Provide an environment variable named `DATABASE_URL` or set it up in [db.js](server/middlewares/db.js)
    ````js
    const db = spicedPg(process.env.DATABASE_URL || `postgres:postgres:postgres@localhost:5432/socialnetwork`);
    ````
    *At SPICED we used a npm module called **[spiced-pg](https://www.npmjs.com/package/spiced-pg)** to simplify the PostgreSQL connection setup*
- ### **Create database tables**
    Database creation files are located in [server/sql](server/sql) directory.  

    Create the **users** table from `users.sql` **first**, the order of the other tables do not matter.
- ### **Setup for cookie session**
    Provide an environment variable named `COOKIE_SECRET` or create a `secrets.json` file in the [server/](server/) directory.  
    For the `secrets.json` example, it should look like this:
    ````json
    {
        "COOKIE_SECRET": "My Cookie Secret"
    }
    ````  
- ### **AWS setup**
    This project makes use of the AWS **S3** (*profile picture upload*) and **SES** (*password reset*) service, so you should have a user ready, who has access to both services.  

    It should work without it, but then you should never try to use these functionalities.  
    You should also remove the appropriate server routes and remove the `require()` calls for the AWS middlewares.
    These routes are to be found in [server/routes/user.js](server/routes/user.js) and [server/routes/password.js](server/routes/password.js)  

    If you have an AWS user ready to go, then you should create a `secrets.json` file inside the [server/](server/) directory.
    If you have done the cookie session part with a `secrets.json` file, then your `secrets.json` file should look like this:
    ````json
    {
        "COOKIE_SECRET": "My Cookie Secret",
        "AWS_KEY": "My AWS Key",
        "AWS_SECRET": "My AWS Secret"
    }
    ````
    You can also provide them through environment variables. If you want to do so, then you should also have an environment variable `NODE_ENV` set to `production`.
    The environment variables should be named the same as the keys from the `secrets.json` example: `AWS_KEY` and `AWS_SECRET`.
    
- ### **Start**
    If everything is set up, then open your terminal, navigate to your project directory and type
    ````console
    npm run dev
    ````
## **Limitations**
The email address used for the reset part (From and To) is currently hardcoded to a specific address. That can be changed in the [AWS SES middleware file](server/middlewares/aws-ses.js).
