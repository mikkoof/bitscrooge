<template>
  <div>
    <p>
      Longest bearish trend within time period:
      {{ calculateBearishTrend(this.history.prices) }}
      in days.
    </p>
  </div>
  <div>
    <p>
      Date for with largest trade volume:
      {{ getDateWithLargestTradingVolume(this.history.market_caps)[0] }}, Amount
      traded:
      {{ getDateWithLargestTradingVolume(this.history.market_caps)[1] }} Euros
      worth
      <!-- Remember to set vs_currecy here if you add option to change it -->
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import History, { Prices } from "@/type/market";
import Market_caps from "@/type/market";

// True if both dates are within same day
const sameDay = (newDate: Date, lastDate: Date) =>
  newDate.getFullYear() == lastDate.getFullYear() &&
  newDate.getMonth() == lastDate.getMonth() &&
  newDate.getDate() == lastDate.getDate();

export default defineComponent({
  name: "statistics",
  setup() {
    return {
      bearishTrend: {
        startDate: Date,
        endDate: Date,
        length: 0,
      },
      // LargestVolume = this.getDateWithLargestTradingVolume(this.history.market_caps);
    };
  },
  props: {
    history: {
      required: true,
      type: [] as PropType<History>,
    },
  },
  methods: {
    calculateBearishTrend(moments: Prices) {
      // console.log(this.history.market_caps[0]);

      // let lastTime = moments[0];
      let lastTime = new Date(0);
      let lastValue = 0;
      let newTime;
      let newValue;
      let longestBearish = 0; // for recording longest bearish trend
      let currentBearish = 0; // loop's current bearish trend.

      /**
       *  if days are same, skip, else set new value.
       *  compare if new value is lower than old value, if so add 1 to current bearish.
       *  if it is higher, compare if currentBearish is larger than longestBearish. If so set current to longest bearish
       */
      for (const [, moment] of Object.entries(moments)) {
        newTime = new Date(moment[0]);
        if (!sameDay(lastTime, newTime)) {
          newValue = moment[1];
          if (newValue < lastValue) {
            currentBearish++;
          } else if (longestBearish < currentBearish) {
            longestBearish = currentBearish;
            currentBearish = 0;
          }
          lastTime = newTime;
          lastValue = newValue;
        }
      }
      return longestBearish;
    },
    getDateWithLargestTradingVolume(
      trade_volumes: Market_caps
    ): [string, number] {
      /** trade volume = amount traded in last 24h. So we
       *  so when iterating through the values, when the date changes,
       *  we set lastDate's trading volume to currentVolume,
       *  then we compare if that is larger than biggest volume,
       *  if it is then we set biggestDate to lastDate and
       *  biggest volume to current volume.
       */
      let largestDate: Date = new Date(0); //Save date for largest trade volume
      let lastDate: Date = new Date(0);
      let currentDate: Date;
      let largestVolume = 0;
      let lastVolume = 0;
      let currentVolume = 0;

      for (const [, trade_volume] of Object.entries(trade_volumes)) {
        currentDate = new Date(trade_volume[0]);
        currentVolume = trade_volume[1];

        if (!sameDay(currentDate, lastDate)) {
          if (lastVolume > largestVolume) {
            largestVolume = lastVolume;
            largestDate = lastDate;
          }
        }
        lastDate = currentDate;
        lastVolume = currentVolume;
      }
      return [largestDate.toLocaleDateString(), largestVolume];
    },
  },
});
</script>
