<template>
  <div>
    <!-- {{ coins }} -->
    <ul>
      <li v-for="day in history" :key="day">
        <p>{{ day[1] }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import History from "../assets/market";

export default defineComponent({
  props: {
    history: {
      required: true,
      type: [] as PropType<History>,
    },
  },
});
</script>

<style scoped></style>
