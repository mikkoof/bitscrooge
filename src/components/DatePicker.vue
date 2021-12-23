<template>
  <div class="datePicker">
    <input
      type="date"
      v-model="date"
      @change="dateToEpoch(date), $emit('date-changed', epochDate)"
    />
  </div>
  <!-- {{ date }} $emit('date-changed', epochDate)-->
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
    dateToEpoch(date: string) {
      let newDate = new Date(date)
      this.epochDate = newDate.getTime() / 1000.0;
      console.log(this.epochDate)
    },
  },
});
</script>
