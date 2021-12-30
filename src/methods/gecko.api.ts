import Coin from "@/type/Coin";
import History from "@/type/History";

export default class Gecko {
  apiAdress = "https://api.coingecko.com/api/v3/";

  fetchMarketChartRange(
    id: string,
    from: number,
    to: number,
    vs_currency = "eur"
  ) {
    const apiAdress = "https://api.coingecko.com/api/v3/";
    const path = `/coins/${id}/market_chart/range/?vs_currency=${vs_currency}&from=${from}&to=${to}`;
    fetch(`${apiAdress + path}`).then((res) =>
      res
        .json()
        .then((data) => (this.history = data.prices))
        .catch((err) => console.log(err.message))
    );
  },
}
