<template>
  <div class="nav-list">
    <query-form ref="query-form"></query-form>
    <query-table ref="query-table"></query-table>
  </div>
</template>

<script>
import queryForm from "./navQueryForm.vue";
import queryTable from "./navQueryTable.vue";
export default {
  components: {
    queryForm,
    queryTable,
  },
};
</script>
