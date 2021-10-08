import schedule, {Job, RecurrenceRule} from "node-schedule";
import {CovidWarningLevel} from "../../models/covidlevel/CovidWarningLevel";
import {covidCrawler} from "../../crawlers/covidlevel/CovidLevelCrawler";

export default class CovidWarningLevelJob {

    public rule: RecurrenceRule;

    constructor(rule: schedule.RecurrenceRule) {
        this.rule = rule;
        this.covidCountyLevelJob();
        this.testJob();
    }
    testJob(): void{
        const job: Job = schedule.scheduleJob('00 26 20 * * 1-5',()=>{
            console.log("Test Job Start");
            console.log("Test Job End");
        })
    }

    covidCountyLevelJob(): void {
        const job: Job = schedule.scheduleJob(this.rule, async () => {
            await console.log("================ CovidCountyLevelJob Start================ ");
            const covidCountyLevelData = await covidCrawler();
            // where 주지않으면 전체 삭제
            const deleteCovidWarningLevel = await CovidWarningLevel.destroy({
                where:{},
                truncate: true
            });
            // console.log("deleteCovidWarningLevel -> ", deleteCovidWarningLevel);
            const covidLevels = await CovidWarningLevel.bulkCreate([...covidCountyLevelData]);
            console.log("covidLevels  -> ", covidLevels);
            await console.log("================ CovidCountyLevelJob End================ ");
        });
    }
}