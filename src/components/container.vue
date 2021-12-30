<template>
  <div class="grid-container">
    <div class="ui-small">
      <dateManager @dates="dateChanged" />
    </div>
    <div class="content">
      <coin-history :Prices="history.prices" />
    </div>
    <div class="stats">
      <statistics v-if="historyLoaded == true" :history="history" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dateManager from "@/components/Datemanager.vue";
import CoinHistory from "./CoinHistory.vue";
import Statistics from "./statistics.vue";
import History from "../type/market";

export default defineComponent({
  components: { dateManager, CoinHistory, Statistics },
  data() {
    return {
      startDate: 0,
      endDate: 0,
      history: [] as PropType<History>,
      historyLoaded: false,
    };
  },
  methods: {
    dateChanged(start: number, end: number) {
      // let gecko = new Gecko();
      this.startDate = start;
      this.endDate = end;
      // this.history = gecko.fetchMarketChartRange("bitcoin", start, end);
      this.fetchMarketChartRange("bitcoin", this.startDate, this.endDate);
      console.log(this.history);
    },
    fetchMarketChartRange(
      id: string,
      from: number,
      to: number,
      vs_currency = "eur"
    ) {
      const apiAdress = "https://api.coingecko.com/api/v3/";
      const path = `/coins/${id}/market_chart/range/?vs_currency=${vs_currency}&from=${from}&to=${to}`;
      // let hist: History;
      fetch(`${apiAdress + path}`).then((res) =>
        res
          .json()
          .then((data) => (this.history = data))
          .then((history) => (this.historyLoaded = true))
          .catch((err) => console.log(err.message))
      );
    },
  },
});
</script>

<style scoped>
.grid-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 120px;
}
.content {
  grid-column: span 2/2;
}
</style>
