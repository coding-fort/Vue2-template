<template>
  <div class="user-list">
    <query-form ref="query-form" :queryForm.sync="queryForm"></query-form>
    <query-table ref="query-table"></query-table>
  </div>
</template>

<script>
import queryForm from "./userQueryForm.vue";
import queryTable from "./userQueryTable.vue";
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
  created() {},
  methods: {},
};
</script>

<style></style>
