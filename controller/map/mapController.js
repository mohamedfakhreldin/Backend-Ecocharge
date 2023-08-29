const stationModel = require("../../DB/Model/stationsModel");
const axios = require('axios')
function array_chuncks(arr,size=23) {
    let chunk = []
    for (let i = 0; i < arr.length; i=i+size) {
      chunk.push(arr.slice(i,i+size))
    
    }
    return chunk
  }
 const getNearestStation =  async(req,res)=>{
  try {
    
    
    let data;
        var token = [];

    
    let stationChunks = array_chuncks(await stationModel.find())
    
    let nearestStation = {value:777777777777777777777777777777777,destination:''};
    for (let k = 0; k < stationChunks.length; k++) {
      var url ='https://api.mapbox.com/directions-matrix/v1/mapbox/driving/'+req.params.lnglat
      for (let j = 0; j < stationChunks[k].length; j++) {
      
        
        url+= ';'+(stationChunks[k][j].longitude)+','+(stationChunks[k][j].latitude)
    }
        
    url += "?sources=0&access_token=" + token[Math.floor(Math.random() * 2)];
   await  axios.get(url).then(res=>{
      data  = res.data
      data.destinations.shift()
      data.durations[0].shift()
    })
    for (let i = 0; i < data.durations[0].length; i++) {
      if(data.durations[0][i]<nearestStation.value){
        nearestStation.value = data.durations[0][i]
        nearestStation.destination = data.destinations[i]
      }
      
    }
  }
  
  
  res.send(nearestStation.destination)
}
catch (error) {
  res.status(500).send(error)
}
 }
module.exports= {getNearestStation}