import jsonp from 'common/js/jsonp'

//获取轮播图数据
export  function getSlider(){
  let url = 'http://localhost:3000/getSlider'
  let data = {
    callback:'_jp1'
  }
  return jsonp(url,data)
}

//获取歌单列表数据
export function getMusicList (){
  let url = 'http://localhost:3000/getMusicList'
  let data = {
    callback:'_jp2'
  }
  return jsonp(url,data)
}
