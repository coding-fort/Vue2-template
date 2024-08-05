<template>
  <div class="system nav-list">
    <nav-list></nav-list>
  </div>
</template>

<script>
import navList from "../components/nav/navList.vue";
import authMixin from "@/modules/system/mixins/auth.mixin";
export default {
  components: {
    navList,
  },
  mixins: [authMixin],
};
</script>

<style></style>
