import seedrandom from "./seedrandom";

function transposeMatrix(matrix: number[][]) {
  const size = matrix.length;

  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      // Swap matrix[i][j] and matrix[j][i]
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  return matrix;
}

function sampleNumbersFromRange(
  min: number,
  max: number,
  count: number,
  rng: () => number,
) {
  const sample: number[] = [];

  for (let i = 0; i < count; i++) {
    let num = 0;
    do {
      num = Math.floor(rng() * (max - min) + 1) + min;
    } while (sample.includes(num));
    sample.push(num);
  }

  return sample;
}

export function newCard(rng: () => number) {
  const card = [];
  for (let i = 0; i < 5; i++) {
    const start = i * 15 + 1;
    const end = (i + 1) * 15;
    card.push(sampleNumbersFromRange(start, end, 5, rng));
  }

  transposeMatrix(card);
  return card;
}

export function getCard(n: number) {
  const rng = seedrandom("bingo");
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error("Enter an integer > 1");
  }
  while (--n) {
    rng();
  }
  return newCard(seedrandom(btoa((rng() * 1000).toString())));
}

function createCardNumbers(start: number, count: number) {
  const rng = seedrandom("bingo");
  let i = 0;
  while (++i < start) {
    rng();
  }
  return Array(count).fill(0).map(() => btoa((rng() * 1000).toString()))
    .reduce((acc, code, idx) => {
      acc[idx + start] = code;
      return acc;
    }, {} as Record<number, string>);
}

export function handleGenerateCards(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const data = new FormData(form);
  const nCardsInput = form.querySelector<HTMLInputElement>("[name=n-cards]")!;
  const startInput = form.querySelector<HTMLInputElement>("[name=card-start]")!;
  const nCards = parseInt(data.get("n-cards")?.toString() || "0");
  const start = parseInt(data.get("card-start")?.toString() || "0");

  let invalid = false;

  if (nCards < 1) {
    invalid = true;
    nCardsInput.nextElementSibling!.innerHTML = "Enter a number &gt; 0";
    nCardsInput.classList.add("is-invalid");
  } else {
    nCardsInput.nextElementSibling!.innerHTML = "";
    nCardsInput.classList.remove("is-invalid");
  }

  if (start < 1) {
    startInput.nextElementSibling!.innerHTML = "Enter a number &gt; 0";
    startInput.classList.add("is-invalid");
    invalid = true;
  } else {
    startInput.nextElementSibling!.innerHTML = "";
    startInput.classList.remove("is-invalid");
  }

  if (invalid) return;

  const numbers = createCardNumbers(start, nCards);
  const id = Object.keys(numbers).join(",");
  const code = Object.values(numbers).join(",");
  const url = new URL("./card", window.location.href + "/");
  url.searchParams.append("id", id);
  url.searchParams.append("code", code);
  window.open(url, "_blank")!.focus();
}
