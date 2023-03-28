import axios from "axios";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const response = await axios.get(`https://calamitymod.wiki.gg/api.php?action=opensearch&format=json&formatversion=2&search=${query.search}&namespace=0&limit=10`);
    return response.data
})