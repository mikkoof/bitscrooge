<template>
  <div class="valueBar">
    <p>time: {{ convertTime(time) }} | value: {{ value }}</p>
    <hr />
  </div>
</template>
<script lang="ts">
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
      //  console.log(this.time);
      return moment.toLocaleString();
    },
  },
});
</script>
<style lang=""></style>
