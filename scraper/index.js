import { scrapeAllStoresType1Cheerio } from "./scrapeWebstoreType1.js";
import { scrapeAllStoreType2 } from "./scrapeWebstoreType2.js";
import { request } from "./requestMethod.js";

const getStores = async () => {
    const storesData = await request.get("/store");
    return storesData.data;
  };


  const addGameCopiestoDB = async () => {
    try {
      const stores = await getStores();
      console.log("Get stores successful");
      await scrapeAllStoreType2(stores)
      await scrapeAllStoresType1Cheerio(stores);
    } catch (error) {
      console.error(error);
    }
  };

  addGameCopiestoDB()