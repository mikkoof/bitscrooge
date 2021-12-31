<template>
  <div class="valueBar split-container">
    <p>Time: {{ convertTime(time) }}</p>
    <p>
      Value:
      <b class="profitableText"> {{ value.toFixed(4) }} </b> €
    </p>
  </div>
  <hr />
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
