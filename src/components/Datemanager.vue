<template>
  <div class="date-selector-container">
    <div class="startDate">
      <date-picker @date-changed="startDate = $event" />
      <p>picked date: {{ startDate }}</p>
    </div>
    <div class="endDate">
      <date-picker @date-changed="endDate = $event" />
      <p>picked date: {{ endDate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
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
});
</script>

<style scoped>
.date-selector-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
}
</style>
