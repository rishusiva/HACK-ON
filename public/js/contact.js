let form = document.getElementById("form");
let popup = document.getElementById("popup1");
let x = document.getElementById("x");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log(user, user.email);
    // window.alert("hi" + " " + user.displayName);
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
      document.getElementById("fname").value = user.name;
      document.getElementById("email").value = email;
    },
    (error) => {
      console.log("Error: " + error.code);
    }
  );
};

x.addEventListener("click", () => {
  popup.classList.remove("visible");
});
let date = new Date().getTime();

let sendMessage = (name, email, msg) => {
  firebase
    .database()
    .ref("/messages/" + date)
    .set({
      name: name,
      email: email,
      msg: msg,
    });
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value,
    fname = document.getElementById("fname").value,
    message = document.getElementById("message").value;
  sendMessage(fname, email, message);
  popup.classList.add("visible");
});
