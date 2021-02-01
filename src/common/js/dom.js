
export function addClass (el,classname){
  if(hasClass(el,classname)) return 
  let newClass = el.className.split(' ')
  newClass.push(classname)
  el.className = newClass.join(' ')
}

export function hasClass (el,classname){
  let rex = new RegExp('(^|\\s)'+classname+'(\\s|$)')
  return rex.test('el.className')
}