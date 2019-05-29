import './style/index.styl';
import createUser from './components/monster-dice/user-interface/user-interface';

const user = {
    availableDices: 6,
    id: 'Nikodermus',
    availableRolls: 3,
};

createUser(user);
