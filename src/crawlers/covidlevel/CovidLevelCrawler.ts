import axios, {AxiosResponse} from "axios";
import cheerio, {Cheerio, CheerioAPI, Element} from "cheerio";

const url = "https://korean.cdc.gov/coronavirus/2019-ncov/travelers/map-and-travel-notices.html";

export interface CovidLevelResponseData {
    level: number,
    name: string,
    country: string
}

const ralList = (el: Element, index: number, ralArray: any[], $: CheerioAPI): Element[] => {
    if (el.children.length > 1) {
        index++;
        for (index; index < 6; index++) {
            ralArray.push($(el).find(`div div.ral${index}`));
        }
    }
    return ralArray;
}

const covidLevelClassification = ($covidContentCols: Cheerio<Element>, ralArray: Cheerio<Element>[], $: CheerioAPI) : void => {
    $covidContentCols.each((index: number, el: Element) => {
        index === 0
            ? ralArray.push($(el).find(`div div.ral${index + 1}`))
            : ralList(el, index, ralArray, $)
    })
}

const createCountyObject = (ralArray: Cheerio<Element>[], $: CheerioAPI): Cheerio<CovidLevelResponseData>[] => {

    return ralArray.map((el: Cheerio<Element>) => {

        const $headerText: string = $(el).find('div div.card div.card-header').text();
        const $cardBodyList: Cheerio<Element> = $(el).find('div div.card div.card-body ul').children('li');
        const countyNameList: Cheerio<string> = $cardBodyList.map((i, innerEl) => {
            return $(innerEl).text()
        });
        const levelName = $headerText.split(":")[0];
        const level = Number(levelName.split(" ")[1]);

        return countyNameList.map((i, countryName): CovidLevelResponseData => {
            return {
                level: !isNaN(level) ? level : 99,
                name: levelName,
                country: countryName
            }
        });
    });
}

const getCovidLevelData = async (html: AxiosResponse<Element>): Promise<Cheerio<CovidLevelResponseData>[]> => {
    const $: CheerioAPI = cheerio.load(html.data);
    const $divSyndicate: Cheerio<Element> = $('main > div:nth-child(3) > div > div.syndicate').children();
    let ralArray: Cheerio<Element>[] = [];

    //div.syndicate" >  div:nth-child(3) ~ 5 .row
    const $divRows: Cheerio<Element> = $divSyndicate.filter((index, element) => {
        return index === 2 || index === 3;
    })
    // col-md- 8~ 12 [4]
    const $divCols: Cheerio<any> = $divRows.map((i, el) => {
        return el.children[0];
    })
    covidLevelClassification($divCols, ralArray, $);

    if (ralArray.length > 0) {
        return createCountyObject(ralArray, $);
    } else {
        throw '가져올 데이터가 없습니다.'
    }

}


const reduceCovidData = (covidLevelData: Cheerio<CovidLevelResponseData>[]): object[] | any[] => {
    return covidLevelData.reduce((previousValue: any, currentValue: Cheerio<CovidLevelResponseData>) => [...previousValue, ...currentValue], []);
};

export const covidCrawler = async ():Promise<any> => {

    try {
        const html: AxiosResponse = await axios.get(url);
        const covidLevelData: Cheerio<CovidLevelResponseData>[] = await getCovidLevelData(html);

        return reduceCovidData(covidLevelData);

    } catch (e) {
        console.error("Covid Crawler Error :", e);
    }
}

