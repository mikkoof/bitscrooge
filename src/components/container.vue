<template>
  <div class="grid-container">
    <div class="ui-small">
      <dateManager @dates="dateChanged" />
    </div>
    <div class="ui-long">
      <coin-history :startDate="startDate" :endDate="endDate" />
    </div>
    <div class="content">
      <coin-history :coins="coins" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dateManager from "@/components/Datemanager.vue";
import CoinHistory from "./CoinHistory.vue";
import Coin from "@/type/Coin";

export default defineComponent({
  components: { dateManager, CoinHistory },
  data() {
    return {
      startDate: 0,
      endDate: 0,
      coins: [] as PropType<Coin>,
    };
  },
  methods: {
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
      /**
       * function fetches coin values and time and casts them into Coin interface.
       */
      const apiAdress = "https://api.coingecko.com/api/v3/";
      const path = `/coins/${id}/market_chart/range/?vs_currency=${vs_currency}&from=${from}&to=${to}`;
      fetch(`${apiAdress + path}`).then((res) =>
        res
          .json()
          .then((data) => (this.coins = data.prices))
          .catch((err) => console.log(err.message))
      );
      // console.log(this.coins);
    },
  },
});
</script>

<style scoped>
.grid-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 120px;
}
</style>
