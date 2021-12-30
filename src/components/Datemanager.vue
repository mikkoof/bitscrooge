<template>
  <div class="date-selector-container">
    <div class="startDate">
      <date-picker @date-changed="startDate = $event" />
      <p>picked date: {{ startDate }}</p>
    </div>
    <div class="endDate">
      <!-- Adding extra 3600 * 24 seconds to end date to make sure we get data for the end date as well -->
      <date-picker @date-changed="endDate = $event + (3600 * 24)" />
      <p>picked date: {{ endDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * This component gets the time range for the app.
 * Start and end dates are in epoch format and emitted for parent component to use.
 * parent component being container.
 */

import { defineComponent } from "vue";
import DatePicker from "@/components/DatePicker.vue";

export default defineComponent({
  components: { DatePicker },
  data() {
    return {
      startDate: 0,
      endDate: 0,
    };
  },
  watch: {
    startDate: function (newVal) {
      if (this.endDate != 0) {
        this.$emit("dates", newVal, this.endDate);
      }
    },
    endDate: function (newVal) {
      this.$emit("dates", this.startDate, newVal);
    },
  },
});
</script>

<style scoped>
.date-selector-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
</style>
