export const getRandomFromArray = (sides = []) => {
  const random = Math.floor(Math.random() * sides.length);
  return [sides[random], random];
};
