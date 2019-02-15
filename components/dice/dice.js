const dice_sides = ["front", "right", "back", "top", "bottom", "left"];
const roll_history = { last: null };

const disableClick = htmlElement => {
  htmlElement.classList.add("disable-click");
};

const enableClick = htmlElement => {
  htmlElement.classList.remove("disable-click");
};

const getWrap = htmlElement => htmlElement.querySelector(".cube__wrap");

const getDiceSide = (sides = []) =>
  sides[Math.floor(Math.random() * sides.length)];

const rollTheDice = ({ target }) => {
  const dice = target.closest(".cube");
  const dice_wrap = getWrap(dice);
  const last_roll = roll_history.last ? roll_history[roll_history.last] : "";

  dice_wrap.classList.remove(`cube__wrap--${last_roll}`);
  disableClick(dice);
  dice_wrap.style.animationPlayState = "running";
  const roll = getDiceSide(dice_sides);

  setTimeout(() => {
    dice_wrap.classList.add(`cube__wrap--${roll}`);
    enableClick(dice);

    const date = new Date();
    roll_history[date.valueOf()] = roll;
    roll_history.last = date.valueOf();
  }, 2000);
};

const cube = document.querySelector(".cube");
cube.addEventListener("click", rollTheDice);

// Object.entries(roll_history).forEach(([key, value]) => {
//   if (Number(key)) {
//     console.log(new Date(Number(key)).toDateString(), value);
//   }
// });
