<template>
  <div>
    <ul>
      <li v-for="moment in Prices" :key="moment">
        <currency-bar :value="moment[1]" :time="moment[0]" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Prices from "../type/market";
import CurrencyBar from "./currencyBar.vue";

export default defineComponent({
  components: { CurrencyBar },
  props: {
    Prices: {
      required: true,
      type: [] as PropType<Prices>,
    },
  },
});
</script>

<style scoped></style>
