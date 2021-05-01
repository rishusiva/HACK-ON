let loginform = document.getElementById("login-form");
let signupform = document.getElementById("register-form");
let error = document.getElementById("error");
let errorMsg = document.getElementById("error-msg");
errorMsg.style.display = "none";

let validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    // document.getElementById("loginform").style.display = "none";
    change();
    window.location.href = "/home";
  } else {
    // No user is signed in.
    // document.getElementById("loginform").style.display = "block";
    console.log("no user is signed in");
  }
});
loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  let userEmail = document.getElementById("eimp").value;
  let userPass = document.getElementById("pimp").value;
  let btn = document.getElementById("loginbtn");
  btn.innerHTML = '<div class="loader" id="loader"></div> ';
  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      // Handle Errors here.
      btn.innerHTML = "Sign In";

      let errorMessage = document.createTextNode(error.message);
      //   alert(errorMessage);
      errorMsg.style.display = "";
      errorMsg.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${errorMessage.textContent}`;
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
document.getElementById("email").addEventListener("keyup", (e) => {
  let email = document.getElementById("email").value;

  if (!validateEmail(email)) {
    errorMsg.style.display = "";
    errorMsg.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please enter a valid email address.`;
  } else {
    errorMsg.style.display = "none";
  }
});
signupform.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  document.getElementById("email").addEventListener("onkeyup", (e) => {
    alert("hi");
    if (!validateEmail(email)) {
      errorMsg.style.display = "";
      errorMsg.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please enter a valid email address.`;
    } else {
      errorMsg.style.display = "none";
    }
  });
  let pass = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let regst = document.getElementById("regno").value;
  let user = firebase.auth().currentUser;
  let btn = document.getElementById("signupbtn");
  btn.innerHTML = '<div class="loader" id="loader"></div> ';
  console.log(user);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((cred) => {
      console.log(cred);
      writeUserData(cred.uid, name, email, regst);
    })
    .catch((error) => {
      let errorMessage = document.createTextNode(error.message);
      //   alert(errorMessage);
      errorMsg.style.display = "";
      errorMsg.innerHTML = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ${errorMessage.textContent}`;
      // ..
    });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .catch(function (error) {
      // Handle Errors here.
      btn.innerHTML = "Sign In";
    });
});
