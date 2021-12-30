<template>
  <div class="valueBar">
    <p>time: {{ convertTime(time) }} | value: {{ value }}</p>
    <hr />
  </div>
</template>
<script lang="ts">
// Used to show each data points values
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "valueBar",
  props: {
    time: {
      required: true,
      type: Number,
    },
    value: {
      required: true,
      type: Number,
    },
  },
  methods: {
    convertTime(epoch: number): string {
      const moment = new Date(epoch);
      return moment.toLocaleString();
    },
  },
});
</script>
<style lang=""></style>
