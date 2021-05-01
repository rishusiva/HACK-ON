const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
// const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  //Animate Links
  navLinks.classList.toggle("open");

  //Hamburger Animation
  hamburger.classList.toggle("toggle");
});
let userid;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // console.log(user, user.email);
    // window.alert("hi" + " " + user.displayName);
    userid = user.uid;
    let email = user.email;
    appt(userid, email);
  } else {
    // No user is signed in.
    window.location.href = "/";
  }
});

let logout = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      window.location.href = "/";
    })
    .catch(function (error) {
      // An error happened
      window.alert("Error:" + error);
    });
};
document.getElementById("logout").addEventListener("click", logout);
let ref = firebase.database().ref("users/");

let appt = (id, email) => {
  ref.on(
    "value",
    (snap) => {
      let user = snap.val()[id];
      document.getElementById("name").innerHTML = user.name;
    },
    (error) => {
      console.log("Error: " + error.code);
    }
  );
};
firebase
  .database()
  .ref("users/" + userId + "/tests/")
  .set({
    test1: True,
    test2: True,
    test3: True,
  });
