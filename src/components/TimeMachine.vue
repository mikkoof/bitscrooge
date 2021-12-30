<template>
  <div>buy at: {{ timeMachine(Prices)[2] }} Value: {{ timeMachine(Prices)[3] }}</div>
  <div>sell at: {{ timeMachine(Prices)[0] }} Value: {{ timeMachine(Prices)[1] }}</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Prices from "../type/market";

export default defineComponent({
  name: "timeMachine",
  setup() {
    return {};
  },
  props: {
    Prices: {
      required: true,
      type: [] as PropType<Prices>,
    },
  },
  methods: {
    timeMachine(moments: Prices) {
      /**
       * compare current value to last value.
       * if current value is larger then last value, compare current value to current trend's highest value
       *    if current value is larger, set current trends highest value and date to current value and date, and update current positive trends's highest value.
       * if current value is smaller than last value, compare current value to current trend's lowest value
       *    if current value is smaller than current trend's lowest value, compare current trend to highest positive trend.
       *        if current trend is larger than highest trend, set highest trend to current trend
       */

      let currentVal: number; //current value
      let currentDate: Date;
      let lastVal = Number.MAX_SAFE_INTEGER; //last value

      let ctlVal = 0; //current positive trend's lowest value
      let cthVal = 0; //current positive trend's highest value
      let ctlDate = new Date(0); //current positive trend's lowest value's date
      let cthDate = new Date(0); //current positive trend's highest value's date
      let ctVal = 0; //current positive trend

      let htVal = 0; //highest positive trend;
      let htlVal = 0; //highest positive trend lowest value
      let hthVal = 0; //highest positive trend highest value
      let htlDate = new Date(0); //highest positive trend's lowest value's date
      let hthDate = new Date(0); //highest positive trend's highest value's date

      // l = lowest, c = current, t = positive trend, h = highest
      for (const [key, moment] of Object.entries(moments)) {
        // initialize values
        if (Number(key) == 0) {
          ctlVal = moment[0];
          cthDate = moment[0];
          lastVal = moment[0];
          ctlDate = new Date(moment[1]);
          cthDate = new Date(moment[1]);
        } else {
          currentVal = moment[0];
          currentDate = new Date(moment[0]);
        //   console.log(currentVal, " ", currentDate)
          if (currentVal > lastVal) {
            if (currentVal > cthVal) {
              cthVal = currentVal;
              cthDate = currentDate;
              ctVal = currentVal - ctlVal;
              if (ctVal > htVal) {
                htVal = ctVal;
                htlVal = ctlVal;
                hthVal = cthVal;
                htlDate = ctlDate;
                hthDate = cthDate;
              }
            }
          } else {
            if (currentVal < ctlVal) {
              if (ctVal > htVal) {
                htVal = ctVal;
                htlVal = ctlVal;
                hthVal = cthVal;
                htlDate = ctlDate;
                hthDate = cthDate;
              }
            }
          }
        }
      }

      return [hthDate, hthVal, htlDate, htlVal];
    },
  },
});
</script>

<style scoped></style>
