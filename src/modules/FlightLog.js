const mongoose = require("mongoose");

  const FlightLogSchema = mongoose.Schema({
    element:{type:String, required:true},
    longitude: {type:String, require: true}, 
    latitude: {type:String, require: true},
    windSpeed : Number,
    windDeg : Number,
    desciption: String,
    name: {type:String, require: true},
    tempMax: Number,
    tempMin: Number,
    pressure: String,
    humidity: String,
    obsFlight: String},
{
    collection: 'FlightLogs'
});


    const FlightLog = mongoose.model("FlightLog", FlightLogSchema);

    module.exports= FlightLog
    