<template>
  <div></div>
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
       * if it is larger,
       */
      // l = lowest, c = current, t = positive trend, h = highest
      let currentVal: number; //current value
      let lastVal = Number.MAX_SAFE_INTEGER; //last value

      let ctlVal: number; //current positive trend's lowest value
      let cthVal: number; //current positive trend's highest value
      let ctlDate: Date; //current positive trend's lowest value's date
      let cthDate: Date; //current positive trend's highest value's date
      let ctVal: number; //current positive trend

      let htVal = 0; //highest positive trend;
      let htlVal: number; //highest positive trend lowest value
      let hthVal: number; //highest positive trend highest value
      let htlDate: Date; //highest positive trend's lowest value's date
      let hthDate: Date; //highest positive trend's highest value's date

      for (const [key, moment] of Object.entries(moments)) {
        // initialize values
        if (Number(key) == 0) {
          ctlVal = moment[1];
          lastVal = moment[0];
        } else {
          currentVal = moment[0];
          
        }
      }
    },
  },
});
</script>

<style scoped></style>
