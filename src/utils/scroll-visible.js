// Pick Camera or a parent Object of the camera By Name
export function scrollVisible(scroll, { page = 1, start, end, startOffset = 0, endOffset = 0 }) {
  if (!scroll) return;
  const startPos = start || (page - 1) / scroll.pages + startOffset * (page / scroll.pages);
  const endPos = end || page / scroll.pages + endOffset * (page / scroll.pages);
  const showPage = Math.max(0, scroll.offset) >= startPos && scroll.offset <= endPos ? true : false;

  return showPage;
}
