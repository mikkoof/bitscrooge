<template>
  <div>buy at: {{ ttData[2] }} Value: {{ ttData[3] }}</div>
  <div>sell at: {{ ttData[0] }} Value: {{ ttData[1] }}</div>
  <p>{{ ttData[4] }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Prices from "../type/market";

export default defineComponent({
  name: "timeMachine",
  data() {
    return {
      ttData: [] as any,
    };
  },
  props: {
    Prices: {
      required: true,
      type: [] as PropType<Prices>,
    },
  },
  mounted() {
    this.timeMachine(this.Prices);
  },
  updated() {
    this.timeMachine(this.Prices);
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
          ctlVal = moment[1];
          cthVal = 0;
          lastVal = moment[1];
          ctlDate = new Date(moment[0]);
          cthDate = new Date(moment[0]);
        } else {
          // set values for the iteration
          currentVal = moment[1];
          currentDate = new Date(moment[0]);
          if (currentVal > lastVal) {
            if (currentVal > cthVal) {
              cthVal = currentVal;
              cthDate = currentDate;
              ctVal = currentVal - ctlVal;
            }
          } else {
            if (currentVal < ctlVal) {
              // reset count
              ctlVal = currentVal;
              ctlDate = currentDate;
              cthVal = currentVal;
              cthDate = currentDate;
              ctVal = 0;
            }
          }
          if (ctVal > htVal) {
            htVal = ctVal;
            htlVal = ctlVal;
            htlDate = ctlDate;
            hthVal = cthVal;
            hthDate = cthDate;
          }
          lastVal = currentVal;
        }
      }
      this.ttData = [hthDate, hthVal, htlDate, htlVal, htVal];
    },
  },
});
</script>

<style scoped></style>
