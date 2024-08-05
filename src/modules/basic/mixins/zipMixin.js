import Jsencrypt from "jsencrypt";
import API from "../axios/api";
export default {
  data() {
    return {
      RSA_PUBLIC_KEY: "",
    };
  },
  methods: {
    /**
     * 获取公钥
     */
    async getPublicKey() {
      let res = await API.getPublicKey();
      this.RSA_PUBLIC_KEY = res.publicKey;
    },
    /**
     * 加密登录信息
     */
    zipLoginInfo() {
      const encrypt = new Jsencrypt();
      encrypt.setPublicKey(this.RSA_PUBLIC_KEY);
      let zipName = encrypt.encrypt(this.form.userName);
      let zipPwd = encrypt.encrypt(this.form.password);
      return {
        userName: zipName,
        password: zipPwd,
      };
    },
    /**
     * 加密重置信息
     */
    zipResetInfo() {
      const encrypt = new Jsencrypt();
      encrypt.setPublicKey(this.RSA_PUBLIC_KEY);
      let zipOldPsw = encrypt.encrypt(this.form.oldPsw);
      let zipNewPsw = encrypt.encrypt(this.form.newPsw);
      return {
        oldPsw: zipOldPsw,
        newPsw: zipNewPsw,
      };
    },
    /**
     * 加密字段信息
     */
    zipFieldInfo(value, publicKey) {
      const encrypt = new Jsencrypt();
      encrypt.setPublicKey(publicKey);
      let zipValue = encrypt.encrypt(value);
      return zipValue;
    },
  },
};
