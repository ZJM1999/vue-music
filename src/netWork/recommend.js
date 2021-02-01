import jsonp from 'common/js/jsonp'
import { options } from 'less'

//获取轮播图数据
export  function getSlider(){
  let url = 'http://192.168.1.101:3000/getSlider'
  let data = {
    callback:'_jp1'
  }
  return jsonp(url,data)
}
