<template>
  <div class="operate-btns">
    <el-button
      v-if="canAdd"
      @click.stop="$emit('add', row)"
      text="新增"
      type="text"
      size="small"
      :class="btnType"
    />
    <el-button
      @click.stop="$emit('edit', row)"
      text="编辑"
      type="text"
      size="small"
      :class="btnType"
    />
    <el-button
      @click.stop="$emit('delete', row)"
      text="删除"
      type="text"
      size="small"
      :class="btnType"
    />
  </div>
</template>
<script>
export default {
  props: {
    row: Object,
  },
  computed: {
    btnType() {
      let typeMapping = {
        primary: "c-primary-i",
        success: "c-success-i",
        warning: "c-warning-i",
        danger: "c-danger-i",
        info: "c-info-i",
      };
      return typeMapping[this.type];
    },
    type() {
      let type = "success";
      this.row.type == "0" && (type = "primary");
      this.row.type == "999" && (type = "warning");
      return type;
    },
    canAdd() {
      return this.row.type != "999";
    },
  },
};
</script>
