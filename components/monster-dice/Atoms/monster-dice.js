import { disableClick, enableClick } from "../../../functionality/htmlElements";

class MonsterDice extends HTMLElement {
  constructor(custom_sides = {}) {
    super();

    this.addEventListener("click", e => this.rollTheDice(e));

    this.custom_sides = custom_sides;
    this.dice_sides = ["front", "right", "back", "top", "bottom", "left"];

    this.dice_sides.forEach(side => {
      if (!this.custom_sides[side]) this.custom_sides[side] = side;
    });

    this.roll_history = {};

    let shadowDice = this.attachShadow({ mode: "open" });

    shadowDice.innerHTML = this.getInitialTemplate();
  }

  getInitialTemplate() {
    return `
        <style>
            :host {
                cursor: pointer;
                height: 500px;
                perspective-origin: 50% 250px;
                perspective: 2000px;
                width: 500px;
            }
            :host .monster-dice__wrap {
                width: 500px;
                height: 500px;
                position: relative;
                transform-style: preserve-3d;
                transform: rotateX(0) rotateY(0);
                margin: 0 auto;
                transition-duration: 2s;
            }
            :host .monster-dice__wrap--front {
                transform: rotateX(-360deg) rotateY(360deg);
            }
            :host .monster-dice__wrap--right {
                transform: rotateX(-360deg) rotateY(270deg);
            }
            :host .monster-dice__wrap--back {
                transform: rotateX(-180deg) rotateY(360deg) rotate(180deg);
            }
            :host .monster-dice__wrap--top {
                transform: rotateX(-630deg) rotateY(360deg) rotate(180deg);
            }
            :host .monster-dice__wrap--bottom {
                transform: rotateX(-270deg) rotateY(360deg);
            }
            :host .monster-dice__wrap--left {
                transform: rotateX(-360deg) rotateY(90deg);
            }
            :host .monster-dice__wrap--fake-roll-0 {
                transform: rotatex(-426) rotateY(344) rotate(93);
                transition-duration: 1s;
            }
            :host .monster-dice__wrap--fake-roll-1 {
                transform: rotatex(-413) rotateY(176) rotate(76);
                transition-duration: 1s;
            }
            :host .monster-dice__wrap--fake-roll-2 {
                transform: rotatex(-546) rotateY(182) rotate(170);
                transition-duration: 1s;
            }
            :host .monster-dice__wrap--fake-roll-3 {
                transform: rotatex(-510) rotateY(144) rotate(111);
                transition-duration: 1s;
            }
            :host .monster-dice__wrap--fake-roll-4 {
                transform: rotatex(-466) rotateY(179) rotate(65);
                transition-duration: 1s;
            }
            :host .monster-dice__wrap--fake-roll-5 {
                transform: rotatex(-436) rotateY(128) rotate(49);
                transition-duration: 1s;
            }
            :host .monster-dice__side {
                position: absolute;
                width: 500px;
                height: 500px;
                box-shadow: inset 0px 10px 250px #5c1414;
                background: #b02626;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 250px;
            }
            :host .monster-dice__side--back {
                transform: translateZ(-250px) rotateY(180deg);
            }
            :host .monster-dice__side--right {
                transform: rotateY(-270deg) translateX(250px);
                transform-origin: right top;
            }
            :host .monster-dice__side--left {
                transform: rotateY(270deg) translateX(-250px);
                transform-origin: left center;
            }
            :host .monster-dice__side--top {
                transform: rotateX(-90deg) translateY(-250px);
                transform-origin: center top;
            }
            :host .monster-dice__side--bottom {
                transform: rotateX(-90deg) translateY(250px);
                transform-origin: center bottom;
            }
            :host .monster-dice__side--front {
                transform: translateZ(250px);
            }
        </style>
        <div class="monster-dice__wrap">
            <div class="monster-dice__side monster-dice__side--front ${
              this.custom_sides.front
            }">
                ${this.custom_sides.front}
            </div>
            <div class="monster-dice__side monster-dice__side--right ${
              this.custom_sides.right
            }">
                ${this.custom_sides.right}
            </div>
            <div class="monster-dice__side monster-dice__side--back ${
              this.custom_sides.back
            }">
                ${this.custom_sides.back}
            </div>
            <div class="monster-dice__side monster-dice__side--top ${
              this.custom_sides.top
            }">
                ${this.custom_sides.top}
            ️</div>
            <div class="monster-dice__side monster-dice__side--bottom ${
              this.custom_sides.bottom
            }">
                ${this.custom_sides.bottom}
            </div>
            <div class="monster-dice__side monster-dice__side--left ${
              this.custom_sides.left
            }">
                ${this.custom_sides.left}
            </div>
        </div>
`;
  }

  rollTheDice({ target }) {
    const { roll_history } = this;

    let timeout = 0;

    const dice = this;
    const dice_wrap = this.children[0];
    const last_roll = roll_history.last ? roll_history[roll_history.last] : "";

    disableClick(dice);
    const [index, roll] = getDiceSide(dice_sides);

    if (last_roll == roll) {
      timeout = 1000;
      dice_wrap.classList.remove(`cube__wrap--${last_roll}`);
      dice_wrap.classList.add(`cube__wrap--fake-roll-${index}`);
    }

    const wait_for_roll = setTimeout(() => {
      dice.addEventListener("transitionend", () => releaseDice(dice));

      dice_wrap.classList.remove(
        `cube__wrap--${last_roll}`,
        `cube__wrap--fake-roll-${index}`
      );
      dice_wrap.classList.add(`cube__wrap--${roll}`);

      const date = new Date();
      roll_history[date.valueOf()] = roll;
      roll_history.last = date.valueOf();

      clearTimeout(wait_for_roll);
    }, timeout);
  }

  connectedCallback() {}

  disconnectedCallback() {}
}

customElements.define("monster-dice", MonsterDice);

const monster_dice = new MonsterDice({
  front: 1,
  right: 2,
  back: 3,
  bottom: "⊗",
  left: "♡",
  top: "x"
});

document.body.insertAdjacentElement("afterbegin", monster_dice);
