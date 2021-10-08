import {CovidWarningLevel} from "../models/covidlevel/CovidWarningLevel";

console.log("Create CovidLevel Table")

export const create_table_covidlevel = () =>{
    CovidWarningLevel.sync({force: true})
        .then(()=>{
            console.log("Success Create Table")
        })
        .catch(e=>{
            console.error("Fail Craete Table",)
            console.error("message = ",e)
        })
}