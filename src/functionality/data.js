export const getRandomFromArray = (sides = []) => {
    const random = Math.floor(Math.random() * sides.length);
    return [sides[random], random];
};

export const getRandomWithinLimit = (min = 0, max = 0) => Math.min(Math.floor(Math.random() * max), min);

export const randomNumber = (limit = 100) => Math.floor(Math.random() * limit);
