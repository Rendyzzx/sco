 //Function untuk update gempa BMKG
export function before(m) {
let gempa = global.db.data.other
let data1 = global.db.data.other
if(!gempa) global.db.data.other = []

if(gempa && gempa.length > 0){

setInterval(async() => {
const {data} = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
let nana = /TimurLaut|Tenggara|BaratDaya|BaratLaut|Utara|Timur|Selatan|Barat/
let lokasi = data.Infogempa.gempa.Wilayah.split("km")[1].replace(nana,"").replace(" ",'').replace(" ","")
let waktu = data.Infogempa.gempa.Jam
let caption = ` *Broadcast Gempa Terkini 🌐*

📅 *Tanggal:* ${data.Infogempa.gempa.Tanggal}
⌚ *Waktu:* ${data.Infogempa.gempa.Jam}
📍 *Kordinat:* ${data.Infogempa.gempa.Coordinates}
⛰️ *Magnitudo:* ${data.Infogempa.gempa.Magnitude}
🕳️ *Kedalaman:* ${data.Infogempa.gempa.Kedalaman}
🚩 *Lokasi:* ${data.Infogempa.gempa.Wilayah}
🌊 *Potention:* ${data.Infogempa.gempa.Potensi}
💡 *Effect:* ${data.Infogempa.gempa.Dirasakan}
`

if(data1){
let getGroups = await this.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)
const image = {url:"https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap}
  
if(data1.lokasi !== lokasi && data1.lokasi !== waktu){
 
data1.lokasi = lokasi
data1.waktu = waktu
  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(2000)
this.sendMessage(i,{image,caption}) 
}
}
}

  
} else {
let getGroups = await this.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)

global.db.data.other['infogempa'] = {
lokasi : lokasi,
waktu: waktu
}

  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(2000)
this.sendMessage(i,{image,caption}) 
}
}
 
} 

}, 60_000*10)// akhir dari set interval

}// akhir dari gempa.length

}


const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}