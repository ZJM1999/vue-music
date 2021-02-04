import jsonp from 'common/js/jsonp'

export function getSingerList(){
  let url = 'http://localhost:3000/getSingerList'
  let data={
    callback:'_jp3'
  }
  return jsonp(url,data)
}