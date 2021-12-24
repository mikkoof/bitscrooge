import Coin from "@/type/Coin";

export default class Gecko {
  apiAdress = "https://api.coingecko.com/api/v3/";

  async fetchMarketChartRange(
    id: string,
    from: number,
    to: number,
    vs_currency = "eur"
  ): Promise<Coin[]> {
    /**
     * function fetches coin values and time and casts them into Coin interface.
     */
    const path = `/coins/${id}/market_chart/range/?vs_currency=${vs_currency}&from=${from}&to=${to}`;
    const res = await fetch(`${this.apiAdress}${path}`).then((res) =>
      res
        .json()
        .then((data) => (this.coins = data))
        .catch((err) => console.log(err.message))
    );
   
    return res as Coin[];
  }
}
