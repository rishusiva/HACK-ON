// document.addEventListener("visibilitychange", function () {
//   document.title = document.visibilityState;
//   alert("You are not allowed to leave the page.");
//   console.log(document.visibilityState);

// });
let modal = document.getElementById("myModal");
let btn = document.getElementById("btn");
let span = document.getElementsByClassName("close")[0];
let form = document.getElementById("form");
let sc = document.getElementById("score");
document.addEventListener("DOMContentLoaded", () => {
  //   form.reset();
});

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
  sc.innerHTML = percentage;
  modal.style.display = "block";
});

// modal.style.display = "block";
// btn.onclick = function () {
//   modal.style.display = "block";
// };

span.onclick = function () {
  modal.style.display = "none";
  btn.innerText = "Submit";
  window.location.href = "/exams";
};

// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
