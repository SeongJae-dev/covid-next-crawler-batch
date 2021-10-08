import axios, {AxiosResponse} from "axios";
import cheerio, {Cheerio, CheerioAPI, Element} from "cheerio";
import {CovidLevelResponseData} from "../covidlevel/CovidLevelCrawler";


const url = 'https://travelscanner.myrealtrip.com/'

class CovidTravelScannerCrawler {

    async crawler(): Promise<any> {
        try {
            const html: AxiosResponse = await axios.get(url);
            const data = await this.getData(html);
            console.log('crawler')
            console.log(data)
            return html

        } catch (e) {
            console.error("Covid Crawler Error :", e);
        }

    }

    async getData(html: AxiosResponse) {
        const $: CheerioAPI = cheerio.load(html.data);
        const $divSyndicate: Cheerio<Element> = $('main > div:nth-child(1) > div:nth-child(3) > section').children();

        console.log('$divSyndicate :', $divSyndicate)
    }
}


export default new CovidTravelScannerCrawler()