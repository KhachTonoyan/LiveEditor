# Live Editor
[![Live Editor](https://img.techpowerup.org/200803/picsart-08-03-06-30-17.png)](https://liveeditorpicsart.web.app/)

# Screenshot
![screenshot of app](https://img.techpowerup.org/200803/selection-722.png)

**Live Editor** is a firebase-enabled (with online database and authentication system) editor written in VanillaJS using MVC structural pattern in the core.

With Live Editor you can:
  - Search in whole project ( using Knuth-Morris-Pratt algorithm, which has time complexity O(n+m) and space complexity O(m) )
  - Use Terminal with bunch of useful commands
  - Authorize with an email address
  - Save data in live DB, so you can continue with your project anywhere just signing in to your account
  - Keep your own File structure by creating files and folders

Live Editor is an online editor where you can work on your project and save your data on your firebase account.

### Tech

Live Editor uses a number of open source projects to work properly:

* [Webpack] - the streaming build system
* [ESLint] - Common code style rules for the whole project
* [Prettier] - keeping clean code

And of course Live Editor itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Live Editor requires [Node.js](https://nodejs.org/) to run.

Clone the project and install the dependencies.

```sh
$ git clone https://github.com/KhachTonoyan/LiveEditor.git
$ cd LiveEditor
$ npm install
```



For using firebase functionality (authorization, live database)...

add **.env** file to root folder
Put your firebase configs to the file like in this sample
```
API_KEY=
AURH_DOMAIN= 
DATABASE_URL= 
PROJECT_ID= 
STORAGE_BUCKET= 
MESSAGING_SENDER_ID= 
APP_ID=
```

run 
```sh
webpack
```
for creating production bundle and run 
```sh
firebase deploy
```
for deploying project to your firebase account.


### Development

Want to contribute? Great!

Live Editor uses Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run this command.

```sh
$ npm run start:dev
```
you can see your project running at localhost:8080...


### Todos

 - Add preview section
 - Add drag&drop functionality to move files and folders within explorer

License
----

MIT


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/KhachTonoyan/LiveEditor>
   [git-repo-url]: <https://github.com/KhachTonoyan/LiveEditor.git>
   [Webpack]: <https://webpack.js.org/>
   [ESLint]: <https://eslint.org/>
   [Prettier]: <https://prettier.io/>
   [node.js]: <http://nodejs.org>

 