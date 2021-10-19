import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import firebase from 'firebase/compat/app';
import  { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { userContext } from "../../App";
import "./login.css";
import firebaseConfig from "../FireBase/firebaseConfig";
// Initialize Firebase

const Login = () => {
     initializeApp(firebaseConfig);
  const [loggedInUser, setloggedInUser] = useContext(userContext);
  const [isNewUser, setUser] = useState(false);
  const [isError, setIsError] = useState({
    emailError: false,
    password: false,
  });
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };


  // google login
  function googleLogin() {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { displayName, email } = result.user;

        const userdetails = { name: displayName, email: email };
        setloggedInUser(userdetails);
        
        // getting token for the user....
        auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          
          localStorage.setItem("token", idToken);
          localStorage.setItem("user", email);
          // setloggedInUser(userdetails);
        }).catch(function(error) {
          alert(error.message);
        });

        history.replace(from);
        
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        alert(errorMessage);
        // ...
      });
  }

  function handleNewUser() {
    setUser(!isNewUser);
  }
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  function handleSignup(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const displayName = e.target.name.value;

    if (isNewUser) {
      if (validateEmail(email)) {
        setIsError({ emailError: false, password: true });
        document.getElementById("loginForm").reset();
        console.log(displayName, email, password);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setUser(!isNewUser);
            alert("New Account Created Successfully! Please Login");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            console.log(error);
            // ..
          });
      } else {
        setIsError({ emailError: true, password: true });
      }
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in

          const { email } = userCredential.user;

          const userdetails = { name: displayName, email: email };
          setloggedInUser(userdetails);
          
          // getting token for the user....
          auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            
            localStorage.setItem("token", idToken);
            localStorage.setItem("user", email);
          }).catch(function(error) {
            alert(error.message);
          });
          
          history.replace(from);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          console.log(error);
        });
    }
  }
  const getUserToken = () => {
    
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      console.log(idToken)
    }).catch(function(error) {
      // Handle error
    });
  }

  return (
    <div className=" login-page">
      <div className="container main-container">
        <div className="main-container__content">
          <div className="content__inputs">
            <form
              onSubmit={handleSignup}
              id="loginForm"
              className="content__input--form"
            >
              {isNewUser && (
                <label htmlFor="name">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                  />
                </label>
              )}
              <label htmlFor="email">
                <input type="email" name="email" required placeholder="Email" />
                {isError.emailError === false ? (
                  <span></span>
                ) : (
                  <span className="error-msg" style={{ color: "red" }}>
                    Please enter valid email address
                  </span>
                )}
              </label>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                />
              </label>
              <button type="submit" className="formbutton">
                {isNewUser ? `Sign Up` : `Sign In`}
              </button>
            </form>
          </div>

          <div className="content__submit">
            <button onClick={handleNewUser} type="button" className="button">
              {isNewUser ? `Sign In` : `Sign Up`}
            </button>
            <div style={{ cursor: "pointer" }} className="button google-button">
              <div className="button google-button__google-icon"></div>
              <p
                style={{ display: "contents" }}
                className="button"
                onClick={googleLogin}
              >
                Sign up with Google
              </p>
            </div>
            <div className="content__submit--line"></div>
            <p>
              Already have an account?
              <a href="/">
                <strong>Sign in</strong>
              </a>
            </p>
            <div className="content__footer">
              <p>
                By clicking "Sign up" button above you agree to our
                <strong> terms of use</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
