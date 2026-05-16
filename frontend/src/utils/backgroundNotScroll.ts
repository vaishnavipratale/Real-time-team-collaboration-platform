export const lockBackgroundScroll = () => {
  document.body.style.overflow = "hidden";
};

export const unlockBackgroundScroll = () => {
  document.body.style.overflow = "";
};
