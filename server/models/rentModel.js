
const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({

    bike : {type : mongoose.Schema.Types.ObjectID , ref:'bikes'},
    user : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
    bookedTimeSlots : {
        from : {type : String} ,
        to : {type : String}
    } ,
    totalDays : {type : Number},
    total : {type : Number},


}, {
    timestamps: true
});

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;