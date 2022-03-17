# Members-Only
In this project, I attempted to host an application where only exclusive members have the ability to post messages. The rest would still be able to see the messages, but only anonymously. I also attempted to replicate the moderator by having an admin to delete any inappropriate messages.


What I learn from this project: When deploying my application to Heroku, it failed several times before I was able to get it to work. The reason was because it could not read my enviroment variables (because I asked Git to ignore it when pushing to main). As a result, I have to manually put in all of my env variables through heroku configuration again. After that, it works as expected. 

What I need to figure out: If I can delete something in my database using router.post, then what is the point of router.delete? (is it to make things readable when debugging?)