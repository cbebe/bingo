import { getCard } from "./card";
import { getBallSet } from "./ball";

function generateBingoCard(n: number) {
  const card = getCard(n);
  // @ts-expect-error
  card[2][2] = "X";
  const balls = getBallSet();
  const matches = card.map((r) => r.map((e) => balls.has(e)));
  matches[2][2] = true;
  const bingo = document.createElement("div");
  bingo.classList.add("bingo", "mx-3");
  bingo.innerHTML = `
      <div class="row">${
    "BINGO".split("").map((e) => `<div class="col"><b>${e}</b></div>`).join(
      "\n",
    )
  }</div>${
    card.map((r, y) =>
      `<div class="row">
      ${
        r.map((c, x) =>
          `<div class="col${(matches[y][x] ? " filled" : "")}">${c}</div>`
        ).join("\n")
      }
      </div>`
    ).join("\n")
  }`;
  return bingo;
}

export function handleValidateCard(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const numberInput = form.querySelector<HTMLInputElement>("[name=card]")!;
  const cardNumber = (data.get("card")?.toString() || "0")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean).map((e) => parseInt(e));

  const parent = form.parentElement!;
  for (const e of parent.querySelectorAll(".bingo")) {
    parent.removeChild(e);
  }
  for (const n of cardNumber) {
    if (n < 1) {
      numberInput.nextElementSibling!.innerHTML = "Enter a number &gt; 0";
      numberInput.classList.add("is-invalid");
      return;
    }

    numberInput.nextElementSibling!.innerHTML = "";
    numberInput.classList.remove("is-invalid");

    parent.appendChild(generateBingoCard(n));
  }
}
