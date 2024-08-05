export default {
  data() {
    return {
      checkAdvice: "",
    };
  },
  methods: {
    /**
     * 操作：审核通过/拒绝
     */
    handleCheck(operate) {
      if (operate == "refuse") {
        if (!this.checkAdvice) {
          this.$message.error("审核拒绝时，审核意见不能为空");
          return;
        }
      }

      this.$confirm("是否执行审核通过操作", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // API.userLogout().then((res) => {
        //   console.log("==================", res);
        //   this.$router.replace("/login");
        // });
      });
      console.log("---------------handleCheck:", operate);
    },
  },
};
