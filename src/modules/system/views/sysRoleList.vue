<template>
  <div class="system role-list">
    <role-list></role-list>
  </div>
</template>

<script>
import roleList from "../components/role/roleList.vue";
import authMixin from "@/modules/system/mixins/auth.mixin";
export default {
  components: {
    roleList,
  },
  mixins: [authMixin],
};
</script>

<style></style>
