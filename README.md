<For express App>
npm i express cors mongoose
npm i --save-dev nodemon

<For Frontend React>
npm create vite@latest
<options>

npm i axios react-redux @reduxjs/toolkit react-router-dom
<axios - is for getting the logic from the nodejs backend

react-redux & @reactjs/toolkit - is for creating the global state for more complex web building

react-router-dom - is used so that if you click for navigation it will not refesh the page or browser

>

npm i redux-persist <to keep the data in the local storage so that if the user refreshes the browser the data will not be removed or vanished from the web>

- For Using firebase for google accounts -
  npm install firebase
  (After installing firebase we need to follow the steps and create a file to paste the code given by firebase the file in this project is - Firebase.js -
  This is how you use dotenv on react = import.meta.env.VARIABLE_NAME =)

Things to learn
-combineReducer- => it allows you to combine multiple reducer functions into a single function that can be passed to the Redux store

(...rest) => gathers the remaining properties of validUser.\_doc into a new object called rest, excluding password.

code for firebase to allow user to only upload images codes below:

service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=\*_} {
allow read;
allow write: if
request.resource.size < 2 _ 1024 _ 1024 &&
request.resource.contentType.matches('image/._')
}
}
}

In the update profile part we need to install cookie-parser
npm i cookie-parser (after you install it put it in your main js in my case its app.js)
