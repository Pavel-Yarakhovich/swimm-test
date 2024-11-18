export const scrollToLocation = (scroll, offset) => {
  scroll.el.scrollTop = scroll.el.scrollHeight * offset;
  scroll.scroll.current = offset;
  scroll.offset = offset;
};
