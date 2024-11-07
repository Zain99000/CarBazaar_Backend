import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
    CarName: { type: String, required: true },
    Color: { type: String, required: true },
    Price: { type: Number, required: false },
    Img: { type: String, required: false },
    Seats: { type: Number, required: false },
    YearOfMfg: { type: String, required: false },
})

export const carModel = mongoose.model('car', carSchema)