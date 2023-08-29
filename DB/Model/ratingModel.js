
const mongoose =require("mongoose")
const ratingSchema = new mongoose.Schema({
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auth',
      required: true,
    },
  },{ timestamps:true}
  );
  
  const Rating = mongoose.model('Rating', ratingSchema);
  
  module.exports = Rating;