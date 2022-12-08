# a99 Final Project Group 13

Rock, paper, scissors

## Summary

Our 'Rock, paper, scissors' game is a simple concept which allows more users to have fun and try to beat our bot in that mini-game. They need to have an account, and after that they are ready to go and enjoy their time. Moreover, for making it more competitvely there will be displayed a leaderboard where the best scores will be presented. Furthermore, for motivating the users, when they are losing against the computer their score will be affected in a negative way. Their final score is: their score - computer score.

## Demo

For taking a look at our demo please go on the following video. Even if is a simple concept, it can become adictive so do not hesitate to try it. We focused in creating a concept so far, considering that was challenging to find appropiate times to meet all of us and do proper development work. So, the video will be done by one person, but everyone contributed in that poject, having an amazing team work flow, and a great experience in the development process. 

https://youtu.be/NbU2CElKXa4

## Setup instruction

1. Clone te repository from our group project on git
2. Run npm install
3. Run npm test
4. Navigate to localhost:2000/
5. CONTROL+C for finishing the job

## Team manageemnt

The team collaboration was great, splitting the jobs and tasks according to everyone time and also for participating as much as possible, everyone bringing his benefits to the project. We figured the following jobs for the team members:

1. A review manager - All the team checked that
2. A plan manager - Robert
3. A documentation manager - Robert
4. A release manager - Bhavith
5. A project manager - Robert
6. Front end lead - Ethan
7. Back end lead - Bhavith
8. Database lead - Bhavith
9. Design lead - Ethan
10. Video Creator - Robert

## Planning

Firstly we assigned the roles that each one will take care and assure that everything is going according to the plan, and more important we will have a finald emo project in due time. Moreover, we communicate daily and meet either in person or through zoom constantly for updating each other about how the project development is going on.

Before the first meeting we set up to do a session of brainstorming and come with several ideas that would be a good approach. Asfter that we had our first official in person meeting on 29th November where we assigned the tasks and made a plan. For questions or problems solutions we used an whatsapp group chat where we communicated. After that we had another meeting on 1st December were we updated all of us and set furthure targets. Next meeting was in person on 7th of December were we set everyhting up, made final changes and do a plan for the presentation.

## Dependencies

We used the following:
- better-sqlite3
- ejs 3.1.8
- express 4.18.2
- minimist 1.2.7

## How users are interacting

User can do the following actions: create an account, delete an account, see if the password is wrong, see if the username is taken, play against the computer by choosing their option in the game, see their position in the leaderboard.

HTML pages and how user interact:

Register account and username taken: users are aible to register themselfs by introducing name, email, username and password. If username is already taken then the username is used page will occur.

Delete account: users are able to delete their account by introducing the username and password (when they are logged in)

Log in: by introducing correct username and password combination users aere able to join the game home page and strat playing the game

Log out: by pressing log out the users are simply logging out of their account

Home: home page is the page with the game, leaderboard and all actions displayed

Wrong password: if the username password combination is wrong and password is wrong then this page will be displayed

Wrong username: if the username does not exist this page will be displayed (when users are trying to log in)

Logs: all the action for the server can be noticed

Post score option: action that can be taken on the home page to update their score in the leaderboard (when they are logged in)

Action takes during the game/playing the game: choosing their option for the game and geetin a: win, tie or lose, affecting their overall score

## API

We have made use of an API, more details about the API endpoints being:

- app.use(): he app object is instantiated on creation of the Express server.
- app.set(): function is used to assigns the setting name to value
- app.get('/'): Redirects to app.get('/login')
- app.get('logs'): userl can view all interactions with the server
- app.get('/login): Log in page
- app.get('/register): Register page is created
- app.get('/delete): Users can delete their account
- app.get('/logout): Users do the logout action
- app.get('/home): Redirected to the home page
- app.post('/login'): receive the username nad password, and check if username exists in database and if the password is correct, If it exists it redirect to the home game page, if not to the wrong username/password page
- app.post('/register'): see if username exists in database, if not user can create the account, if not redirect to the username exists page
- app.post('/delete'): if password and username matches the user can delete their account, if not they have to try again
- app.post('/post_score'): user will be able to post their score in the database
- app.post('/paper'): reflect the paper user option in game logic
- app.post('/scissors'): reflect the scissors user option in game logic
- app.post('/rock'): reflect the rock user option in game logic
- app.listen(port): bind and listen the connections on the specified host and port

## Future development plan

Considering that the mini-game world in developing constantly, we are considering to improve our design since we haven't had enough time to proper take care of that, and after to add more minigames for creating an interactive webpage for users, that they can use to compete against each other for getting the better score and maybe, why not to gain some sort of rewards. Also, for this particular game, we have to fix the leaderboard to make the players be actually in order (highest score to the smalles one).

Thanks for your time!
