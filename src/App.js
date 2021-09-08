import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config'
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


function App() {

  

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var gitProvider = new firebase.auth.GithubAuthProvider();

  const [user, setUser] = useState({});
  console.log(user);

  //Google pop up login
  const handleGoogleSignIn = () => {
    firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    var credential = result.credential;

    var token = credential.accessToken;
    var user = result.user;
    setUser(user);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

  //facebook pop up log in
  const handleFacebookSignIn = () => {
    firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var user = result.user;
      var accessToken = credential.accessToken;

    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
  }

  //Gitbub pop up log in 
  const handleGithubSignIn = () => {
    firebase
    .auth()
    .signInWithPopup(gitProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      setUser(user);
      console.log('user', user);
    })
    
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log('error', errorCode, errorMessage);
    });
  }

  return (
    <div className="App">

      <button onClick={handleGoogleSignIn}>Google Log in</button> <br />
      <button onClick={handleFacebookSignIn}>Facebook Log in</button> <br />
      <button onClick={handleGithubSignIn}>Github Log in</button> <br />

      <div>
        <p>Name: {user.displayName}</p>
        <img src={user.photoURL} alt="" />
      </div>

    </div>
  );
}

export default App;
