const map = {
  center: {
    left: '50%',
    transform: 'translateX(-50%)'
  }
}

const notDeleteAttr = ['left']; // 执行getSpliceOps时，不可删除的属性列表

export function getAppendOps(ops, cssType) {
  
  let css = map[cssType];
  let newOps = Object.assign({}, ops);

  if(!css){
    console.error(`找不到'${cssType}'对应的css片段`)
    return
  }

  for (const attr in css) {
    if (css.hasOwnProperty(attr)) {
      const val = css[attr];
      // 本身已经存在该属性的话则替换该属性值，没有则新增
      newOps[attr] = val;
    }
  }

  return newOps
}

export function getSpliceOps(ops, cssType) {

  let css = map[cssType];
  let newOps = Object.assign({}, ops);

  if(!css){
    console.error(`找不到'${cssType}'对应的css片段`)
    return
  }

  for (const attr in css) {
    if (css.hasOwnProperty(attr) && notDeleteAttr.indexOf(String(attr)) === -1) {
      delete newOps[attr]
    }
  }

  return newOps
  
}