import Vue from "vue";
import { Message } from "element-ui";

Vue.directive("copy", {
  bind(el) {
    // 添加双击事件
    el.addEventListener("dblclick", () => handleClick(el.innerText));
  },
});

async function handleClick(text) {
  let _text = "";
  if (text.length < 32) {
    _text = "0".repeat(32 - text.length) + text;
  }
  try {
    await navigator.clipboard.writeText(_text);
    console.log("双击复制成功", new Date().toLocaleTimeString());
    Message.success("复制成功");
  } catch (err) {
    // 浏览器禁用了非安全域（安全域：如 https 协议的地址、127.0.0.1 或 localhost ）的 navigator.clipboard 对象
    console.warn(
      "双击复制成功，注：当前浏览器环境为非安全域",
      new Date().toLocaleTimeString()
    );
    // 创建text area
    const textArea = document.createElement("textarea");
    textArea.value = _text;
    // 使text area不在viewport，同时设置不可见
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
      Message.success("复制成功");
    });
  }
}
