firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    let userid = user.uid;
    let email = user.email;
    fill(userid, email);
  } else {
    // No user is signed in.
    window.location.href = "/";
  }
});
let fill = (id, email) => {
  ref.on(
    "value",
    (snap) => {
      let user = snap.val()[id];
      console.log(user);
      document.getElementById("fname").innerHTML = user.name;
      document.getElementById("userid").innerHTML = id;
      document.getElementById("email").innerHTML = email;
      document.getElementById("regno").innerHTML = user.regst;
    },
    (error) => {
      console.log("Error: " + error.code);
    }
  );
};
