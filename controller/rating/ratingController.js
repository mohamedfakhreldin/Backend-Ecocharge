const Rating = require("../../DB/Model/ratingModel");



const addRating= async (req, res) => {
    const { rating, station} = req.body;
    
    try {
      const getRating= await  Rating.findOne({user:req.user.id,station})
      if (getRating) {
      
        await Rating.findOneAndUpdate({user:req.user.id,station},{rating})
      } else {
        
        const rate = new Rating({ rating, station, user:req.user.id });
        await rate.save();
      }
      res.status(201).json({message:"ratingSaved"});
    } catch (err) {
      res.status(403).json({message:"error to save rate",...err})
    }
  }
// const addRating= async (req, res) => {
//   const { rating, station, user } = req.body;

//   const rate = new Rating({ rating, station, user });

//   try {
//     await rate.save();
//     res.status(201).json({message:"ratingSaved"});
//   } catch (err) {
//     res.json({message:"error to save rate",...err})
//   }
// }

  const getRating=async(req,res)=> {
    const {stationId}=req.params
    const ratings = await Rating.find({ station: stationId });
    const totalRatings = ratings.length;
    // console.log(totalRatings)
    const sumRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
    res.status(201).json({message:"rated done",rate:averageRating})
  }

  module.exports={
    addRating,
    getRating
  }