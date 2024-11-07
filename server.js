import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import { ConnectDB } from "./ConnectDB/ConnectDB.js";
import { carModel } from "./Models/carModel.js";

const app = express();

app.use(cors({
    origin: [`http://localhost:3000`],
    methods: [`POST`, `DELETE`, `PATCH`, `PUT`, `GET`],
    credentials: false
}))

app.use(express.json());
app.use(cookieParser());

ConnectDB();

app.get('/', (req, res) => res.json(`Hello World`))

app.get('/getcardetails', async (req, res) => {
    try {
        const cars = await carModel.find();

        if (cars.length) {
            res.json({ Cars: cars, Available: true })
            return;
        }

        res.json({ Available: true, message: `No Cars found` })

    } catch (error) {
        console.log(error);
    }
})

app.get('/getgivencardetails/:carid', (req, res) => {
    const { carid } = req.params;

    carModel.findById(carid)
        .then((car) => {
            if (!car) {
                res.status(404).json({ message: `No Car Found with the given car id` })
                return;
            }

            if (!carid) {
                res.status(400).json({ message: `Car id is required` });
                return;
            }

            res.status(200).json({ Car: car, message: `Car exists` });
        })
        .catch(err => console.log(err))
})

const port = 8000;

app.listen(port, () => console.log(`Server running at port ${port}`))
