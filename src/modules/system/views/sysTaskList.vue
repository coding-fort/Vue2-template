<template>
  <div class="system task-list">
    <task-list></task-list>
  </div>
</template>

<script>
  import authMixin from "@/modules/system/mixins/auth.mixin";
  export default {
    components: {},
    mixins: [authMixin],
  };
</script>

<style></style>
