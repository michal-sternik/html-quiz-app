const params = new URLSearchParams(document.location.search);
const result = params.get("result");

const blueCircle = document.querySelector(".blue_circle");
const scoreDiv = document.createElement("div");

blueCircle.style.transform = "translateY(50px)"

scoreDiv.textContent = `Your score is ${result}!`;
scoreDiv.classList.add("text_result");
blueCircle.insertAdjacentElement("beforebegin", scoreDiv);
