<template>
  <div>
    <!-- <div v-if="isModuleIndex">
      system-index.page
      <br />
      <router-link :to="'/system/home'">click</router-link><br />
    </div> -->
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import componentRouteHook from "@/mixins/componentRouteHook";
export default {
  module: "system",
  mixins: [componentRouteHook],
  data() {
    return {};
  },
};
</script>

<style></style>
