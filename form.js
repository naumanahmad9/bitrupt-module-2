/*
 * index page
 */

const signUpSwitch = document.getElementById("signup-switch");
const signInSwitch = document.getElementById("signin-switch");
const container = document.getElementById("container");

signUpSwitch.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInSwitch.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// form validation

const nameField = document.getElementById("signup-name");
const emailField = document.getElementById("signup-email");
const passwordField = document.getElementById("signup-password");
const confirmPasswordField = document.getElementById("signup-confirm-password");
const lettersRegex = /^[A-Za-z]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function validation() {
  let email = emailField.value;
  let password = passwordField.value;
  let confirmPassword = confirmPasswordFieldField.value;

  if (!emailRegex.test(email)) {
    alert("Please enter correct email address");
    return false;
  } else if (!passwordRegex.test(password)) {
    alert(
      "Please chose a password which have the following: At least  8 characters, at least one number, at least one letter should be capital, at least one symbol "
    );
    return false;
  } else if (confirmPassword !== password) {
    alert("Please confirm password correctly");
    return false;
  } else {
    return true;
  }
}

// firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyCEpCp5GE-5cio7ZzBZ5QQ4Mu837HGisHo",
  authDomain: "bitrupt-module-2.firebaseapp.com",
  databaseURL: "https://bitrupt-module-2-default-rtdb.firebaseio.com",
  projectId: "bitrupt-module-2",
  storageBucket: "bitrupt-module-2.appspot.com",
  messagingSenderId: "389014818585",
  appId: "1:389014818585:web:9d8d6ac38d221ec1e73f88",
  measurementId: "G-7BG3PWSCXT",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signUp() {
  if (validation()) {
    const emailInput = document.getElementById("signup-email");
    const passwordInput = document.getElementById("signup-password");

    const promise = auth.createUserWithEmailAndPassword(
      emailInput.value,
      passwordInput.value
    );
    promise
      .then((e) => {
        emailInput.value = "";
        passwordInput.value = "";
        alert("SING UP SUCCESSFUL");
        location.replace("./home.html");
      })
      .catch((e) => alert(e.message));
  }
}

function signIn() {
  const emailInput = document.getElementById("signin-email");
  const passwordInput = document.getElementById("signin-password");

  const promise = auth.signInWithEmailAndPassword(
    emailInput.value,
    passwordInput.value
  );
  promise
    .then((e) => {
      alert("SIGNED IN: " + emailInput.value);
      emailInput.value = "";
      passwordInput.value = "";
      location.replace("./home.html");
    })
    .catch((e) => alert(e.message));
}
