import {
    disableClick,
    enableClick,
} from '../../../functionality/html-elements';
import { getRandomFromArray } from '../../../functionality/data';

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
    }

    rollTheDice () {
        const { roll_history, dice_sides } = this;

        let timeout = 0;

        const dice = this;
        // eslint-disable-next-line
        console.log(this.children);
        const dice_wrap = this.children[0];
        const last_roll = roll_history.last
            ? roll_history[roll_history.last]
            : '';

        disableClick(dice);
        const [index, roll] = getRandomFromArray(dice_sides);

        if (last_roll === roll) {
            timeout = 1000;
            dice_wrap.classList.remove(`cube__wrap--${last_roll}`);
            dice_wrap.classList.add(`cube__wrap--fake-roll-${index}`);
        }

        const wait_for_roll = setTimeout(() => {
            dice.addEventListener('transitionend', () => enableClick(dice));

            dice_wrap.classList.remove(
                `cube__wrap--${last_roll}`,
                `cube__wrap--fake-roll-${index}`,
            );
            dice_wrap.classList.add(`cube__wrap--${roll}`);

            const date = new Date();
            roll_history[date.valueOf()] = roll;
            roll_history.last = date.valueOf();

            clearTimeout(wait_for_roll);
        }, timeout);
    }
}

customElements.define('monster-dice', MonsterDice);

export default MonsterDice;
