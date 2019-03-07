const dice_sides = ["front", "right", "back", "top", "bottom", "left"];
const roll_history = { last: null };

const disableClick = htmlElement => {
  console.log("disabling");
  htmlElement.classList.add("disable-click");
};

const enableClick = htmlElement => {
  console.log("enabling");
  htmlElement.classList.remove("disable-click");
};

const getWrap = htmlElement => htmlElement.querySelector(".cube__wrap");

const getDiceSide = (sides = []) => {
  const random = Math.floor(Math.random() * sides.length);
  return [random, sides[random]];
};

const releaseDice = dice => {
  enableClick(dice);
  dice.removeEventListener("transitionend", releaseDice);
};

const rollTheDice = ({ target }) => {
  let timeout = 0;

  const dice = target.closest(".cube");
  const dice_wrap = getWrap(dice);
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
};

const cube = document.querySelector(".cube");
cube.addEventListener("click", rollTheDice);

const getRollHistory = () => {
  Object.entries(roll_history).forEach(([key, value]) => {
    if (Number(key)) {
      console.log(new Date(Number(key)).toDateString(), value);
    }
  });
};
