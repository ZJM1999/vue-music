import jsonp from 'common/js/jsonp'
import axios from 'axios'

export function getSingerList(){
  let url = 'http://localhost:3000/getSingerList'
  let data={
    callback:'_jp3'
  }
  return jsonp(url,data)
}

export function getSingerDetail(mid){
  let url = `/api/detail`
  let data={
    g_tk: '1928093487',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: '002J4UUk29y8BY',
    jsonpCallback: 'jsonp',
    format: 'json'
  }
  return axios.get(url,{params:data})
}