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
    singermid: mid,
    jsonpCallback: 'jsonp',
    format: 'json'
  }
  return axios.get(url,{params:data})
}

export function getSong (mid) {
  let url = '/api/song'
  // let data = {
  //   "-": "getplaysongvkey3820812414147996",
  //   "g_tk": 5381,
  //   "sign": "zzasmkvfaz09yxyha85c52cda41177b42ff548e6248577ca",
  //   "loginUin": 0,
  //   "hostUin": 0,
  //   "format": "json",
  //   "inCharset": "utf8",
  //   "outCharset": "utf-8",
  //   "notice": 0,
  //   "platform": "yqq.json",
  //   "needNewCode": 0,
  //   "data": {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"9524011917","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"9524011917","songmid":[`${mid}`],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}
  // }
  let data = {
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 2081228240, 
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    format: 'json',
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'json'
  }
  return axios.get(url,{params:data})
}