# README #

Front-end for Test Drive StandbyMP
https://testdrive.dbvisit.com

### What is this repository for? ###

* React+Typescript Front-end for Dbvisit StanbyMP test drive
* Version 2.0

### How do I get set up? ###

* install node 
* npm start
* edit .ts files
* npm run build
* copy files from /dist/

### Stack

* React
* Typescript
* Redux with Toolkit
* React Router
* ErrorBoundary
* Lazy Load
* Webpack + Bundle Analyzer
* Font Awsome icons
* SCSS

### Features

* Google reCaptcha bot protection
* User email stored in local storage
* If test session for a user is still available new form submit will resume the session
* VideoJS is used to immediately display video controls for more user-friendly audio enabling
* "Copy" button for easy copying host names, usernames, passwords for tests
* ALl the errors (API calls, or any JS errors) are sent to Slack via AWS lambda function