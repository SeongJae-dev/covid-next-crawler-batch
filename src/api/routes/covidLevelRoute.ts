import express from "express";
import CovidLevelService from "../../services/covidlevel/CovidLevelService";

const router = express.Router();

router.get("/batch", CovidLevelService.batch);

router.get("/list", CovidLevelService.getCovidLevels)

router.post("/county", CovidLevelService.save)


export default router;