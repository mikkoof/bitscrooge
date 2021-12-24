<template>
  <div class="grid-container">
    <div class="ui-small">
      <dateManager />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dateManager from "@/components/Datemanager.vue";

export default defineComponent({
  components: { dateManager },
});
</script>

<style scoped>
.grid-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, auto-fit, minmax(240px, 1fr));
  grid-auto-rows: 120px;
}
</style>
