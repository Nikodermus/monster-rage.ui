export const disableClick = htmlElement => {
  htmlElement.classList.add("disable-click");
};

export const enableClick = htmlElement => {
  htmlElement.classList.remove("disable-click");
};
