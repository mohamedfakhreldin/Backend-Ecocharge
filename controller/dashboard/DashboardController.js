const userModel = require('../../DB/Model/userModel')
const stationModel = require('../../DB/Model/stationsModel')
const ratingModel = require('../../DB/Model/ratingModel')
myModels = {
    users:userModel,
    stations:stationModel,
    ratings:ratingModel
}
async function recordsCount(model,countQuery={}){
    var data;
 return await  myModels[model].count()
    
}

async function recordsLast7Days(model){
    let dates = []
  let count = []
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate()-7)
  const toDate = new Date();
const data = await myModels[model].aggregate([{
  $match:{createdAt:{$lt:toDate,$gt:fromDate}},},
 { $group : {
    _id :{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt"} },
    count: { $sum: 1 }
}
  }]).exec()
  let existDate;
  for (let index = 0; index < 7; index++) {
    fromDate.setDate(fromDate.getDate()+1);
    existDate = false
    for (j=0;j<data.length && !existDate;j++) {
      if (data[j]._id==fromDate.toISOString().split('T')[0]) {
        dates.push(data[j]._id)
        count.push(data[j].count)
        existDate = true

      }
    }    
      if(!existDate){
        dates.push(fromDate.toISOString().split('T')[0])
        count.push(0)
      }
    
  }
 return {dates,count} 
}
async function dashboard(req,res){
    try {
        let data = {
            usersCount:await recordsCount('users'),
            stationCount:await recordsCount('stations'),
            ratingCount:await recordsCount('ratings'),
            ratings:await recordsLast7Days('ratings'),
            users:await recordsLast7Days('users'),
            stations:await recordsLast7Days('stations'),
        } 
        res.json(data)
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports={dashboard,recordsLast7Days}