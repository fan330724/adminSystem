function autoWidth(size){
  let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
  if (!clientWidth) return size;
  let percent = (clientWidth / 1920);
  return size * percent;
}

export {
  autoWidth
}