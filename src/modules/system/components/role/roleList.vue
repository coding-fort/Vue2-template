<template>
  <div class="role-list">
    <query-form ref="query-form" :queryForm.sync="queryForm"></query-form>
    <query-table ref="query-table"></query-table>
  </div>
</template>

<script>
import queryForm from "./roleQueryForm.vue";
import queryTable from "./roleQueryTable.vue";
export default {
  components: {
    queryForm,
    queryTable,
  },
  provide() {
    return {
      getQueryForm: () => this.queryForm,
    };
  },
  data() {
    return {
      queryForm: {},
    };
  },
};
</script>

<style></style>
