import {response} from "express";
import {sequelize} from "../../models";
import {CovidWarningLevel} from "../../models/covidlevel/CovidWarningLevel";
import {Request, Response} from "express/ts4.0";
import {covidCrawler, CovidLevelResponseData} from "../../crawlers/covidlevel/CovidLevelCrawler"
import {CovidLevelRequestDto} from "../../models/covidlevel/CovidLevelRequestDto";


class CovidLevelService {

    constructor() {
    }


    public async save(req: Request, res: Response) {
        if (Object.keys(req.body).length <= 0) {
            res.status(400).send({
                message: "Content can not be empty"
            })
        }

        const param = {
            level: req.body.level,
            name: req.body.name,
            country: req.body.country
        }
        const createCountyLevel = await CovidWarningLevel.create(param);


        res.send({
            createCountyLevel: createCountyLevel,
        });
    }


    public getCovidLevels(req: Request, res: Response) {
        CovidWarningLevel.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "findAll exception"
                })
            })
    }

    public async batch(req: Request, res: Response): Promise<any> {

        try {
            const covidLevelResponseData: Promise<CovidLevelResponseData> = await covidCrawler();

            // @ts-ignore
            const covidLevels: object[] = await CovidLevel.bulkCreate([...covidLevelResponseData]);

            return res.send({
                message: "success Covid Level",
                count: covidLevels.length
            });

        } catch (e) {
            console.error("batch error : ", e);
            return res.send({
                errorMessage: e
            });
        }

    }
}

export default new CovidLevelService();