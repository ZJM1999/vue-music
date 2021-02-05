
//添加类名
export function addClass (el,classname){
  if(hasClass(el,classname)) return 
  let newClass = el.className.split(' ')
  newClass.push(classname)
  el.className = newClass.join(' ')
}

//验证dom否含有某个类
export function hasClass (el,classname){
  let rex = new RegExp('(^|\\s)'+classname+'(\\s|$)')
  return rex.test('el.className')
}

//获取属性
export function getAttr (el,attr,val){
  let preStr = 'data-'
  let name = preStr+attr
  if(val){
    return el.setAttribute(name,val)
  }else{
    return el.getAttribute(name)
  }
}