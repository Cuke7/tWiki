import axios from "axios"
import { parse } from "node-html-parser";
import tabletojson from "tabletojson";


export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const response = await axios.get(`https://calamitymod.wiki.gg/api.php?action=parse&page=${query.page}&format=json`);
    console.log(response.data)
    const root = parse(response.data.parse.text["*"]);
    const useInHTML = root.querySelector(".crafts")?.querySelector("table")?.innerHTML;
    const data_usedIN = tabletojson.Tabletojson.convert("<table>" + useInHTML + "</table>", { stripHtmlFromCells: false });
    const recipesHTML = root.querySelector(".background-1")?.querySelector("table")?.innerHTML;
    const data_recipesHTML = tabletojson.Tabletojson.convert("<table>" + recipesHTML + "</table>", { stripHtmlFromCells: false });

    return { data_usedIN, data_recipesHTML }
})