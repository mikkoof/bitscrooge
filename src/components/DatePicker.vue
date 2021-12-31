<template>
  <div class="datePicker">
    <input
      type="date"
      v-model="date"
      @change="dateToEpoch(date), $emit('date-changed', epochDate)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      date: "",
      epochDate: 0 as number,
    };
  },
  methods: {
    /**
     * when user selects a date from input,
     * the dateToEpoch function is called with the date as string parameter
     * The date is then turned into epoch time.
     * This is done because CoinGecko api uses this time format.
     */
    dateToEpoch(date: string) {
      let newDate = new Date(date);
      this.epochDate = newDate.getTime() / 1000.0;
      // console.log(this.epochDate);
    },
  },
});
</script>
