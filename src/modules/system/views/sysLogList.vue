<template>
  <div class="system log-list">
    <log-list></log-list>
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
