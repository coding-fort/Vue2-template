<template>
  <div class="system user-list">
    <user-list></user-list>
  </div>
</template>

<script>
import userList from "../components/user/userList.vue";
import authMixin from "@/modules/system/mixins/auth.mixin";
export default {
  components: {
    userList,
  },
  mixins: [authMixin],
};
</script>

<style></style>
