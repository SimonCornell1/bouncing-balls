# bouncing-balls

Starting off a simple project for learning javascript with a view
to writing simple games.

I've split some functions out to a separate module 'core.js'. In doing so
its no longer possible to run game.html as a local file without a web
server. We need to use a web server in order for module imports to work.

One easy way to run a web server is using python from a command prompt:
e.g. 

bouncing-balls\src>C:\python39\python.exe -m http.server

Then from a browser go to:

http://localhost:8000/game.html
