<template>
  <button @click="fetchData()">Get price</button>
  <div v-if="price">
    <p>btc in eur: {{ price.bitcoin.eur }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  price: 0,
  components: {},
  data() {
    return {
      price: null,
    };
  },
  methods: {
    fetchData() {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
      )
        .then((res) => res.json())
        .then((data) => (this.price = data))
        .catch((err) => console.log(err.message));
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
