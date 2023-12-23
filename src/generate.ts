import seedrandom from "./seedrandom";
import { newCard } from "./card";

createCards();
window.print();

function createCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code")?.split(",") || [];
  const id = urlParams.get("id")?.split(",").map((e) => parseInt(e)) || [];

  for (let i = 0; i < id.length; i += 2) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.appendChild(generateCard(code, id, i));
    if (id[i + 1]) {
      row.appendChild(generateCard(code, id, i + 1));
    } else {
      row.appendChild(emptyDiv());
    }
    document.body.appendChild(row);
  }
}

function generateCard(code: string[], id: number[], idx: number) {
  const rng = seedrandom(code[idx]);
  const cardId = id[idx];

  const card = newCard(rng);

  // @ts-expect-error
  card[2][2] = "X";

  const el = document.createElement("table");
  el.innerHTML = `
<tr>
  ${
    "BINGO".split("").map((e) =>
      `<th><div class="content"><h1>${e}</h1></div></th>`
    ).join("\n")
  }
</tr>
${
    card.map((r) =>
      `<tr>${
        r.map((c) => `<td><div class="content">${c}</div></td>`).join("\n")
      }</tr>`
    ).join("\n")
  }`;
  const h2 = document.createElement("h2");
  h2.innerHTML = `Card #${cardId}`;
  const div = document.createElement("div");
  div.classList.add("column");
  div.appendChild(h2);
  div.appendChild(el);
  return div;
}

function emptyDiv() {
  const div = document.createElement("div");
  div.classList.add("column");
  return div;
}
