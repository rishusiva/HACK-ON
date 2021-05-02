let test1 = document.getElementById("test1");
let test2 = document.getElementById("test2");
let test3 = document.getElementById("test3");
let test11 = document.getElementById("test11");
let test22 = document.getElementById("test22");
let test33 = document.getElementById("test33");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

if (localStorage.getItem("view") != "false") modal.style.display = "block";
span.onclick = function () {
  localStorage.setItem("view", "false");
  modal.style.display = "none";
};
test11.style.display = "none";
test22.style.display = "none";
test33.style.display = "none";
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    let userid = user.uid;
    let email = user.email;
    check(userid, email);
  } else {
    // No user is signed in.
    window.location.href = "/";
  }
});
let user;
let check = (id, email) => {
  firebase
    .database()
    .ref("users/")
    .on(
      "value",
      (snap) => {
        user = snap.val()[id].tests;
        if (user.test1 == "True") {
          test11.style.display = "";
          test1.style.display = "none";
        } else {
          test1.style.display = "";
          test11.style.display = "none";
        }
        if (user.test2 == "True") {
          test22.style.display = "";
          test2.style.display = "none";
        } else {
          test2.style.display = "";
          test22.style.display = "none";
        }
        if (user.test3 == "True") {
          test33.style.display = "";
          test3.style.display = "none";
        } else {
          test3.style.display = "";
          test33.style.display = "none";
        }
      },
      (error) => {
        console.log("Error: " + error.code);
      }
    );
};
