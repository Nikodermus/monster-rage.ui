import { getRandomFromArray } from '../../functionality/data';
import { disableClick, enableClick } from '../../functionality/html-elements';

class MonsterDice extends HTMLElement {
    constructor (custom_sides = {}) {
        super();

        this.addEventListener('click', (e) => this.rollTheDice(e));

        this.custom_sides = custom_sides;
        this.dice_sides = ['front', 'right', 'back', 'top', 'bottom', 'left'];

        this.dice_sides.forEach((side) => {
            if (!this.custom_sides[side]) this.custom_sides[side] = side;
        });

        this.roll_history = {};

        this.innerHTML = this.getInitialTemplate();
    }

    getInitialTemplate () {
        return `
        <div class="monster-dice__wrap">
            <div class="monster-dice__side monster-dice__side--front ${
    this.custom_sides.front
}">
                <span>${this.custom_sides.front}</span>
            </div>
            <div class="monster-dice__side monster-dice__side--right ${
    this.custom_sides.right
}">
                <span>${this.custom_sides.right}</span>
            </div>
            <div class="monster-dice__side monster-dice__side--back ${
    this.custom_sides.back
}">
                <span>${this.custom_sides.back}</span>
            </div>
            <div class="monster-dice__side monster-dice__side--top ${
    this.custom_sides.top
}">
                <span>${this.custom_sides.top}</span>️
            </div>
            <div class="monster-dice__side monster-dice__side--bottom ${
    this.custom_sides.bottom
}">
                <span>${this.custom_sides.bottom}</span>
            </div>
            <div class="monster-dice__side monster-dice__side--left ${
    this.custom_sides.left
}">
                <span>${this.custom_sides.left}</span>
            </div>
        </div>
`;
    }

    rollTheDice () {
        const { roll_history, dice_sides } = this;

        let timeout = 0;

        const dice = this;
        const last_roll = roll_history.last
            ? roll_history[roll_history.last]
            : '';

        disableClick(dice);
        const [roll, index] = getRandomFromArray(dice_sides);

        if (last_roll === roll) {
            timeout = 1000;
            dice.classList.remove(`monster-dice--${last_roll}`);
            dice.classList.add(`monster-dice--fake-roll-${index}`);
        }

        const wait_for_roll = setTimeout(() => {
            setTimeout(() => {
                enableClick(dice);
            }, 2000);

            dice.classList.remove(
                `monster-dice--${last_roll}`,
                `monster-dice--fake-roll-${index}`,
            );
            dice.classList.add(`monster-dice--${roll}`);

            const date = new Date();
            roll_history[date.valueOf()] = roll;
            roll_history.last = date.valueOf();

            clearTimeout(wait_for_roll);
        }, timeout);
    }

    get rollHistory () {
        return this.roll_history;
    }
}

customElements.define('monster-dice', MonsterDice);

export default MonsterDice;
