<template>
<h1>BitScrooge</h1>
  <div class="grid-container">
    <div class="timeControl ui-block">
      <h3>Date Picker</h3>
      <dateManager @dates="dateChanged" />
    </div>
    <div class="stats ui-block" v-if="historyLoaded == true">
      <h3>Statistics</h3>
      <statistics v-if="historyLoaded == true" :history="history" />
    </div>
    <div class="timeMachine ui-block" v-if="historyLoaded == true">
      <h3>Time Machine</h3>
      <time-machine :Prices="history.prices" />
    </div>
    <div class="content ui-block" v-if="historyLoaded == true">
      <h3>Data points:</h3>
      <coin-history :Prices="history.prices" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dateManager from "@/components/Datemanager.vue";
import CoinHistory from "./CoinHistory.vue";
import Statistics from "./statistics.vue";
import History from "../type/market";
import TimeMachine from "./TimeMachine.vue";

export default defineComponent({
  name: "layout",
  components: { dateManager, CoinHistory, Statistics, TimeMachine },
  data() {
    return {
      startDate: 0,
      endDate: 0,
      history: [] as PropType<History>,
      historyLoaded: false,
    };
  },
  methods: {
    /**
     * history array is populated using fetchMarketChartRange function every time dates are changed.
     * fetchMarketChartRange function inserts the data into history nested array.
     * History nested array uses History interface created in type/market.ts file. With Vetur addon in vs code
     * you can then navigate the nested array like "history.prices" or "history.market_caps".
     * This allows easy re-use of data.
     * Future version would have own class where functions for CoinGecko api would be collected and imported from.
     */
    dateChanged(start: number, end: number) {
      this.startDate = start;
      this.endDate = end;
      this.fetchMarketChartRange("bitcoin", this.startDate, this.endDate);
    },
    fetchMarketChartRange(
      id: string,
      from: number,
      to: number,
      vs_currency = "eur"
    ) {
      console.log("fetching...")
      const apiAdress = "https://api.coingecko.com/api/v3/";
      const path = `/coins/${id}/market_chart/range/?vs_currency=${vs_currency}&from=${from}&to=${to}`;
      fetch(`${apiAdress + path}`).then((res) =>
        res
          .json()
          .then((data) => (this.history = data))
          .then(() => (this.historyLoaded = true))
          .catch((err) => console.log(err.message))
      );
    },
  },
});
</script>

<style>
@import "../assets/style.css";
</style>
