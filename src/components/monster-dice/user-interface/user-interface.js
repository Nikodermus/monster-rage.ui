import MonsterDice from '../monster-dice';
import { randomNumber } from '../../../functionality/data';

import './user-interface.styl';

const createUserContainer = (id) => {
    const userContainer = document.createElement('div');

    userContainer.setAttribute('id', `ui-${id}`);
    userContainer.classList.add('user-interface', `user-interface--${id}`);

    return userContainer;
};

const createUserButton = (dices) => {
    const button = document.createElement('button');
    button.innerText = 'Roll dices!';
    button.classList.add('user-interface__btn');
    button.addEventListener('click', () => {
        dices.forEach((dice) => dice.rollTheDice());
    });

    return button;
};

const createUser = (properties = {}) => {
    const {
        availableDices,
        id = `ui-${randomNumber()}`,
        availableRolls = 3,
    } = properties;

    const parsedID = id.toLowerCase().trim();

    const userContainer = createUserContainer(parsedID);

    const dices = [];

    const diceContainer = document.createElement('div');
    diceContainer.classList.add('user-interface__dice-container');
    userContainer.appendChild(diceContainer);

    for (let i = 0; i < availableDices; i += 1) {
        const userDice = new MonsterDice();
        dices.push(userDice);
    }

    dices.forEach((node) => diceContainer.appendChild(node));

    const userButton = createUserButton(dices, availableRolls);
    userContainer.appendChild(userButton);

    document.body.appendChild(userContainer);

    return dices;
};
export default createUser;
