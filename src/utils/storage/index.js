let storage = (function () {
  let isSupport = function (storageType) {
    let testKey = "test",
      storage = window[storageType];
    try {
      storage.setItem(testKey, "1");
      storage.removeItem(testKey);
      return storageType in window && window[storageType];
    } catch (e) {
      return false;
    }
  };
  let storages = ["sessionStorage"];
  // let ifDev = process.env.NODE_ENV === 'development'
  // if (ifDev) {
  //   storages = ['localStorage', 'sessionStorage']
  // } else {
  //   storages = ['sessionStorage']
  // }
  for (let i = 0, len = storages.length; i < len; i++) {
    if (isSupport(storages[i])) return window[storages[i]];
  }
  return null;
})();

export default {
  storage: storage,

  // 获取 Cookie
  getCookie: getCookie,
  // 设置 Cookie
  setCookie: setCookie,
  // 移除 Cookie
  removeCookie: removeCookie,

  // 获取所有storge
  all: function () {
    if (this.storage) {
      let obj = {};
      for (let i = 0, len = this.storage.length; i < len; i++) {
        let key = this.storage.key(i);
        obj[key] = this.storage.getItem(key);
      }
      return obj;
    }
    return {};
  },

  // 获取登录信息
  // loginInfo: function () {
  //   let { EXIT_LOGIN_STORAGE } = require('@common/constant/index')
  //   let obj = {}
  //   EXIT_LOGIN_STORAGE.map(item => {
  //     let v = this.get(item, true)
  //     if (v) {
  //       obj[item] = v
  //     }
  //   })
  //   return obj
  // },
  /**
   * isOutPeriod 方法，判断 value 值是否过期
   * @param value 值
   */
  isOutPeriod(value) {
    if (!value.value) {
      return true;
    }
    let readTime = Number(new Date());
    return readTime - Number(value.writeTime) > value.expired;
  },

  isNotExist: function (value) {
    return value === null || typeof value === "undefined";
  },

  set: function (key, value, expired = null) {
    let data = {
      value,
      writeTime: Number(new Date()),
      expired,
    };
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(data));
    } else {
      setCookie(key, this.encrypt(String(value)), 1);
    }
    return this;
  },

  get: function (item, complete = false) {
    let dataJSON = null;
    // let isGalaxy = this.getCookie('galaxy')
    // let keyArr = ['token', 'galaxy', 'companyId', 'userId', 'employeeId', 'realName', 'userAccount', 'phone', 'companyName', 'companyList', 'isTourist', 'userName', 'userRoleInfo']
    // if(isGalaxy && keyArr.includes(item) && this.getCookie(item)) {
    //   return this.getCookie(item)
    // }
    if (this.storage) {
      dataJSON = this.storage.getItem(item);

      // 当目标不存在时直接结束
      if (this.isNotExist(dataJSON)) {
        return "";
      }
      let data = JSON.parse(dataJSON);

      // 当数据的存在周期未定义时，它被认为是永久的
      if (this.isNotExist(data.expired)) {
        return complete ? data : data.value; // 是否完整返回
      }
      // 数据声明期结束时释放数据
      if (this.isOutPeriod(data)) {
        // console.log('数据声明期结束时释放数据===>', item, data)
        this.remove(item);
        return null;
      }
    }
  },

  /* 获取浏览器存储里key为item的JSON
        @param item 要获取的数据的索引值
       Usage:
         s.getJson('token');
    */
  getJson: function (item) {
    let data = this.get(item);
    if (data) {
      return JSON.parse(data);
    }

    return {};
  },

  /* 获取浏览器存储里key为item的JSON
        @param item 要获取的数据的索引值
       Usage:
         s.setJson('token');
    */
  setJson: function (key, value) {
    value = JSON.stringify(value);
    return this.set(key, value);
  },

  /* 删除浏览器存储的数据
        @param itemArr 要删除的数据的key组成的数组
       Usage:
        s.remove('token');
        s.remove(['token', 'uname']); // 将删除浏览器存储中，索引为token和uname的数据
    */
  remove: function (itemArr) {
    if (typeof itemArr == "string") {
      itemArr = [itemArr];
    }
    for (let i = 0, len = itemArr.length; i < len; i++) {
      if (this.storage) {
        this.storage.removeItem(itemArr[i]);
      } else {
        removeCookie(itemArr[i]);
      }
    }
    return this;
  },

  // 加密
  encrypt: function (value) {
    return value;
  },

  // 解密
  decrypt: function (value) {
    return value;
  },
};

/* 获取 Cookie 值
 */
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

/* 保存 Cookie 值
 */
function setCookie(name, value, expiredays) {
  let exdate = new Date();
  if (value != null && value != "" && value != "null") {
    exdate.setDate(exdate.getDate() + expiredays);
  } else {
    exdate.setDate(exdate.getDate() - 1);
  }
  document.cookie =
    name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

/* 删除 Cookie
 */
function removeCookie(name) {
  setCookie(name, "", -1);
}
