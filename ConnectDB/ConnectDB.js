import mongoose from "mongoose"
import { carModel } from "../Models/carModel.js";

export const ConnectDB = () => {
    mongoose.connect(`mongodb+srv://mdzainkamal:ucH1XSRxISLjMHl2@cluster0.zy3nj.mongodb.net/CarBazaar?retryWrites=true&w=majority&appName=Cluster0`)
        .then(async () => {
            console.log(`DB Connected`);
            try {
                const car = await carModel.find();
                console.log(car[0].CarName);
            } catch (error) {
                console.log(error);
            }
        })
        .catch(err => console.log(err));
}