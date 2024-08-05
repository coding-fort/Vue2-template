import EsButton from "./src/table";

/* istanbul ignore next */
EsButton.install = function (Vue) {
  Vue.component(EsButton.name, EsButton);
};

export default EsButton;
