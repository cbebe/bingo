function addNumber(n: number) {
  const existingNumbers = document.querySelector<HTMLUListElement>("#balls")!;
  const li = document.createElement("li");
  const num = "BINGO"[Math.floor((n - 1) / 15)] + n.toString();
  li.innerHTML = `${num} <span class="badge bg-danger rounded-pill">X</span>`;
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
  );
  const btn = li.querySelector("span")!;
  btn.addEventListener("click", function cb() {
    existingNumbers.removeChild(li);
    btn.removeEventListener("click", cb);
  });
  existingNumbers.prepend(li);
}

function getBallSet(): Set<number> {
  const balls = document.querySelector<HTMLUListElement>("#balls")!;
  return new Set<number>(
    Array.from(balls.children).map((e) => parseInt(e.innerHTML.slice(1))),
  );
}

export function handleAddBall(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const ball = new FormData(form).get("ball")?.toString();
  if (!ball) return;
  const ballInput = form.querySelector<HTMLInputElement>("[name=ball]")!;
  const errorMsg = ballInput.nextElementSibling!;
  const number = parseInt(ball.match(/[BINGO]?([0-9]+)/)?.[1] || "0");
  const balls = getBallSet();
  if (number < 1 || number > 75) {
    errorMsg.innerHTML = "Enter a number between 1 and 75.";
    ballInput.classList.add("is-invalid");
  } else if (balls.has(number)) {
    errorMsg.innerHTML = "Number already picked.";
    ballInput.classList.add("is-invalid");
  } else {
    ballInput.value = "";
    ballInput.classList.remove("is-invalid");
    errorMsg.innerHTML = "";
    addNumber(number);
  }
}

export function addRandomBall() {
  let num = 0;
  const balls = getBallSet();
  do {
    num = Math.floor(Math.random() * 75) + 1;
  } while (balls.has(num));
  addNumber(num);
}

export function clearBalls() {
  if (confirm("Are you sure you want to clear the balls?")) {
    const balls = document.querySelector<HTMLUListElement>("#balls")!;
    balls.innerHTML = "";
  }
}
