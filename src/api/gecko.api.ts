import Coin from "@/type/Coin";
import History from "@/type/History";

export default class Gecko {
  apiAdress = "https://api.coingecko.com/api/v3/";

  async fetchMarketChartRange(
    id: string,
    from: number,
    to: number,
    vs_currency = "eur"
  ): Promise<History> {
    /**
     * function fetches coin values and time and casts them into Coin interface.
     */
    const path = `/coins/${id}/market_chart/range/?vs_currency=${vs_currency}&from=${from}&to=${to}`;
    let history: History;
    await fetch(`${this.apiAdress}${path}`).then((res) =>
      res
        .json()
        .then((data) => (history = data))
        .catch((err) => console.log(err.message))
    );

    return history as History;
  }
}
