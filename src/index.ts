import express, {Request, Response, NextFunction} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import {sequelize} from "./models";
import CovidLevelRouter from "./api/routes/covidLevelRoute";
import JobProvider from "./jobs/JobProvider";

import {create_table_covidlevel} from "./migrations/create-table-covidlevel";
import CovidTravelScannerCrawler from "./crawlers/travelScanner/CovidTravelScannerCrawler";

// create_table_covidlevel()

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const HOST: string = process.env.HOST || '0.0.0.0';
const app = express();


class Index {
    init() {
        // const promise = CovidTravelScannerCrawler.crawler();

        dotenv.config();
        JobProvider.config();

        app.use(cors());
        app.use(express.json());
        app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`Request Occur! ${req.method}, ${req.url}`);
            next();
        })
        app.use(express.urlencoded({extended: false}));

        app.use("/covid-county-level", CovidLevelRouter);

        app.get('/', (req, res) => {
            res.send("Start Express!")
        })

        app.listen(PORT, HOST, async () => {
            console.log(`run express server http://${HOST}:${PORT}`);

            await sequelize.authenticate()
                .then(async () => {
                    console.log("DB connection success");
                })
                .catch(e => {
                    console.error("DB connection error : ", e);
                })
        })

    }
}

export default new Index()





