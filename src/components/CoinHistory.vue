<template>
  <div>
    <!-- {{ coins }} -->
    <ul>
      <li v-for="coin in coins" :key="coin">
        <p v-for="value in coin" :key="value">{{ value }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Coin from "@/type/Coin";

export default defineComponent({
  props: {
    coins: {
      required: true,
      type: Array as PropType<Coin[]>,
    },
  },
});
</script>

<style scoped></style>
