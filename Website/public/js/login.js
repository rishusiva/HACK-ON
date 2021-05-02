let loginpage = document.getElementById("login-page");
let signuppage = document.getElementById("signup-page");
let loginform = document.getElementById("login-form");
let signupform = document.getElementById("signup-form");
signupform.style.display = "none";

let signupForm = () => {
  loginform.style.display = "none";
  signupform.style.display = "block";
};
let loginForm = () => {
  signupform.style.display = "none";
  loginform.style.display = "block";
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    document.getElementById("loginform").style.display = "none";
    change();
    window.location.href = "/home";
  } else {
    // No user is signed in.
    document.getElementById("loginform").style.display = "block";
  }
});

loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  let userEmail = document.getElementById("eimp").value;
  let userPass = document.getElementById("pimp").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      window.alert("Error : " + errorMessage);

      // ...
    });
});

let logout = () => {
  firebase.auth().signOut();
};
let writeUserData = (userId, name, email, regs) => {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      name: name,
      email: email,
      regst: regs,
    });
};
signupform.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let regst = document.getElementById("regno").value;
  let user = firebase.auth().currentUser;
  console.log(user);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((cred) => {
      console.log(cred);
      writeUserData(cred.uid, name, email, regst);
    });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log("Error : " + errorMessage);
    });
});

let change = () => {
  let user = firebase.auth().currentUser;
  let name = document.getElementById("name").value;

  user
    .updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
    .then(function () {
      // Update successful.
    })
    .catch(function (error) {
      // An error happened.
    });
};
