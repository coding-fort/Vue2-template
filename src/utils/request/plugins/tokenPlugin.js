// token-plugin.js
const tokenPlugin = () => {
  const getToken = () => {
    // 从localStorage或其他存储位置获取token
    const token = localStorage.getItem("token");
    return token;
  };

  const setToken = (newToken) => {
    // 设置token到localStorage或其他存储位置
    localStorage.setItem("token", newToken);
  };

  const refreshOrSetToken = async () => {
    // 示例：检查token是否有效，如果无效则尝试刷新token
    const token = getToken();
    if (!token) {
      // 这里可以调用API刷新token
      // const refreshedToken = await fetch('/api/refresh-token').then(res => res.json());
      // setToken(refreshedToken);
      console.log("Token is not available or invalid.");
    } else {
      console.log("Token is valid.");
    }
  };

  return {
    getToken,
    setToken,
    refreshOrSetToken,
  };
};

export default tokenPlugin;
