import MonsterDice from './components/monster-dice/monster-dice';
import './style/index.styl';

const monster_dice = new MonsterDice({
    front: 1,
    right: 2,
    back: 3,
    bottom: '⚡️',
    left: '❤️',
    top: '⚔',
});

document.body.appendChild(monster_dice);
