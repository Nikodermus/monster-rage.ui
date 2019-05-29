import { getRandomFromArray } from '../../functionality/data';
import { disableClick, enableClick } from '../../functionality/html-elements';

class MonsterDice extends HTMLElement {
    constructor () {
        super();

        this.addEventListener('click', this.rollTheDice);

        this.sides = [
            { side: 'front', face: 1, value: 1 },
            { side: 'right', face: 2, value: 2 },
            { side: 'back', face: 3, value: 3 },
            { side: 'bottom', face: '⚡️', value: 'power' },
            { side: 'left', face: '❤️', value: 'live' },
            { side: 'top', face: '⚔', value: 'attack' },
        ];

        this.roll_history = {
            last: '',
        };

        this.innerHTML = this.getInitialTemplate();
    }

    getInitialTemplate () {
        const { sides } = this;

        return `
<div class="monster-dice__wrap">
    ${sides
        .map(
            ({ side, face }) => `
                        <div class="monster-dice__side monster-dice__side--${side}">
                            <span>${face}</span>
                        </div>
                    `,
        )
        .join('')}
</div>
`;
    }

    rollTheDice () {
        const dice = this;

        const { roll_history, sides } = dice;
        const last_roll = roll_history.last;
        const [roll, index] = getRandomFromArray(sides);

        disableClick(dice);

        if (last_roll) dice.classList.remove(`monster-dice--${last_roll}`);

        dice.classList.add(`monster-dice--fake-roll-${index}`);

        const wait_for_roll = setTimeout(() => {
            setTimeout(() => {
                enableClick(dice);
            }, 2000);

            dice.classList.remove(
                `monster-dice--${last_roll}`,
                `monster-dice--fake-roll-${index}`,
            );
            dice.classList.add(`monster-dice--${roll.side}`);

            const date = new Date();
            roll_history[date.valueOf()] = roll.value;
            roll_history.last = roll.side;

            //eslint-disable-next-line
            console.error(roll_history);

            clearTimeout(wait_for_roll);
        }, 1000);
    }

    get rollHistory () {
        return this.roll_history;
    }
}

customElements.define('monster-dice', MonsterDice);

export default MonsterDice;
