import CovidWarningLevelJob from "./covidlevel/CovidWarningLevelJob";
import schedule, {Job, RecurrenceRule} from 'node-schedule';

class JobProvider {


    private rule: RecurrenceRule;

    constructor() {
        this.rule = new schedule.RecurrenceRule();
        console.log("Job Provider Initialize");
    }

    // Recurrence Rule Scheduling
    // Sun ~ Sat 0 ~ 6
    // 월 ~ 일 00시 15분 실행
    config(): void {
        this.rule.dayOfWeek = [0, new schedule.Range(0, 6)]
        this.rule.hour = 16;
        this.rule.minute = 59;
        new CovidWarningLevelJob(this.rule);
    }
}

export default new JobProvider();