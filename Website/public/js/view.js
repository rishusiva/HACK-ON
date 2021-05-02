let modal = document.getElementById("myModal");
let errModal = document.getElementById("errorModal");
let btn = document.getElementById("btn");
let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementById("close-modal");
let form = document.getElementById("form");
let sc = document.getElementById("score");
let warning = document.getElementById("warnings");
let count = 3;
document.addEventListener("visibilitychange", function () {
  // document.title = document.visibilityState;
  errModal.style.display = "block";

  // alert("You are not allowed to leave the page.");
  if (document.visibilityState == "hidden") count--;
  warning.innerText = "";
  warning.innerText = count;
  console.log(document.visibilityState + count);

  if (count == 0) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let userid = user.uid;
        let email = user.email;
        update(userid, email);
        setTimeout(() => (window.location.href = "/exams"), 1000);
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //   form.reset();
});
// let tests = {
//   test1: "False",
//   test2: "False",
//   test3: "False",
// };
form.addEventListener("submit", (e) => {
  btn.innerHTML = '<div class="loader" id="loader"></div> ';

  let submittedAns = [],
    score = 0;
  e.preventDefault();
  let el = form.elements;
  for (let i = 0; i < el.length; i++) {
    if (el[i].checked) submittedAns.push(el[i].previousSibling.nodeValue.trim());
  }
  console.log(submittedAns);
  let total = submittedAns.length;
  for (let i = 0; i < total; i++) {
    if (submittedAns[i] == answers[i]) {
      score++;
    }
  }
  let percentage = (score * 100) / total;
  console.log(percentage);
  sc.innerHTML = percentage.toPrecision(4);
  modal.style.display = "block";
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      let userid = user.uid;
      let email = user.email;
      update(userid, email);
    }
  });
});
let ref = firebase.database().ref("users/");
let update = (id, email) => {
  ref.on(
    "value",
    (snap) => {
      let user = snap.val()[id];
      // document.getElementById("name").innerHTML = user.name;
      let url = window.location.pathname.substr(7, 5);
      let tests = user.tests;
      tests[url] = "True";
      updateChecked(id, email, url, tests);
    },
    (error) => {
      console.log("Error: " + error.code);
    }
  );
};
let updateChecked = (id, em, testId, testObj) => {
  firebase
    .database()
    .ref("users/" + id + "/tests/")
    .set(testObj);
};
// modal.style.display = "block";
// btn.onclick = function () {
//   modal.style.display = "block";
// };

span.onclick = function () {
  modal.style.display = "none";
  btn.innerText = "Submit";
  window.location.href = "/exams";
};
span2.onclick = function () {
  errModal.style.display = "none";
};

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};
let countDownDate = new Date().addHours(0.5);

let myfunc = setInterval(function () {
  let now = new Date().getTime();
  let timeleft = countDownDate - now;
  let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  document.getElementById("hours").innerHTML = hours + "h ";
  document.getElementById("mins").innerHTML = minutes + "m ";
  document.getElementById("secs").innerHTML = seconds + "s ";

  if (timeleft < 0) {
    clearInterval(myfunc);
    document.getElementById("hours").style.display = "none";
    document.getElementById("mins").style.display = "none";
    document.getElementById("secs").style.display = "none";
    document.getElementById("end").innerHTML = "Time Up!";
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let userid = user.uid;
        let email = user.email;
        update(userid, email);
        setTimeout(() => (window.location.href = "/exams"), 1000);
      }
    });
  }
}, 1000);
