import MonsterDice from './components/monster-dice/Molecules/wrap-dice';

const monster_dice = new MonsterDice({
    front: 1,
    right: 2,
    back: 3,
    bottom: '⊗',
    left: '♡',
    top: 'x',
});

document.body.appendChild(monster_dice);
