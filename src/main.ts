import "./style.css";
import { handleGenerateCards } from "./card";
import { addRandomBall, clearBalls, handleAddBall } from "./ball";

function toggleDisplay(e: Element) {
  e.classList.toggle("d-flex");
  e.classList.toggle("d-none");
}

function toggleGenerateCards() {
  toggleDisplay(document.querySelector("#main")!);
  toggleDisplay(document.querySelector("#generate")!);
}

function toggleValidateCard() {
  toggleDisplay(document.querySelector("#main")!);
  toggleDisplay(document.querySelector("#validate")!);
}

const handlers = {
  "#ball-number": ["submit", handleAddBall],
  "#random-ball": ["click", addRandomBall],
  "#clear-balls": ["click", clearBalls],
  "#generate-cards": ["click", toggleGenerateCards],
  "#generate > button.btn-close": ["click", toggleGenerateCards],
  "#cards": ["submit", handleGenerateCards],
  "#validate-card": ["click", toggleValidateCard],
  "#validate > button.btn-close": ["click", toggleValidateCard],
} as const;

for (const k in handlers) {
  // @ts-expect-error
  const [event, handler] = handlers[k];
  document.querySelector(k)!.addEventListener(event, handler);
}
