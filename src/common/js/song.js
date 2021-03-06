export default class Song {
  constructor({id,mid,singer,name,album,duration,image,url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData,vkey) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=6252649575&vkey=${vkey}&uin=0&fromtag=38`
  })
}

function filterSinger(singer) {
  if(!Array.isArray(singer)){
    return ''
  }
  let singerArr = []
  singer.forEach((item)=>{
    singerArr.push(item.name)
  })
  return singerArr.join('/')
}