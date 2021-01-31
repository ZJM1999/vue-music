import originJsonp from 'jsonp'

export default function jsonp(url,data,options){
  //处理带参数的url
  url+=url.indexOf('?')<0?'?':'&'+handle(data)
  //所有异步请求数据一般都封装成promise
  return new Promise((resolve,reject)=>{
    originJsonp(url,options,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })

}
//处理url的参数
function handle(data){
  var url = ''
  for (const key in data) {
    //考虑data中属性值为空的情况
    url+= (data[key]!==undefined)?`&${key}=${encodeURIComponent(data[key])}`:''
  }
  return url?url.substring(1):''
}