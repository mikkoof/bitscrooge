<template>
  <div v-if="profitable == true">
    <p>buy at: {{ ttData[2] }} Value: {{ ttData[3] }}</p>
    <p>sell at: {{ ttData[0] }} Value: {{ ttData[1] }}</p>
    <p>profit if buying and selling 1 bitcoin: <b class='profitableText'>{{ ttData[4].toFixed(4) }}</b> Euros</p>
  </div>
  <div v-if="profitable == false">
    <p>buying during this time period is not profitable</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Prices from "../type/market";

export default defineComponent({
  name: "timeMachine",
  data() {
    return {
      ttData: [] as any,
      profitable: false, //this is set to true if it's possible to profit in time period
    };
  },
  props: {
    Prices: {
      required: true,
      type: [] as PropType<Prices>,
    },
  },
  watch: {
    Prices: function () {
      this.timeMachine(this.Prices);
    },
  },
  mounted() {
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
      console.log("test");
      let currentVal: number; //current value
      let currentDate: Date;
      let lastVal = Number.MAX_SAFE_INTEGER; //last value
      // l = lowest, c = current, t = positive trend, h = highest
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

      for (const [key, moment] of Object.entries(moments)) {
        // initialize values with first object in array
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
              // new highest point in on dataset
              cthVal = currentVal;
              cthDate = currentDate;
              ctVal = currentVal - ctlVal;
            }
          } else {
            if (currentVal < ctlVal) {
              // new lowest point, start new dataset
              ctlVal = currentVal;
              ctlDate = currentDate;
              cthVal = currentVal;
              cthDate = currentDate;
              ctVal = 0;
            }
          }
          if (ctVal > htVal) {
            // current dataset has better profit than previously best dataset, replace best dataset with current dataset
            htVal = ctVal;
            htlVal = ctlVal;
            htlDate = ctlDate;
            hthVal = cthVal;
            hthDate = cthDate;
          }
          // prep for next iteration
          lastVal = currentVal;
        }
      }
      // set the values for component to use.
      if (htVal > 0) this.profitable = true;
      this.ttData = [hthDate, hthVal, htlDate, htlVal, htVal];
    },
  },
});
</script>
