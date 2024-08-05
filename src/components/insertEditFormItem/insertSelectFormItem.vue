<template>
  <div class="insert-select-form-item" :class="dynamicsClass">
    <!-- - {{ existsOldValue }} -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      v-if="(canEdit || isDisabled) && canVisabled"
    >
      <el-form-item
        :label="label"
        :prop="field"
        class="edit-field"
        :class="isForceEdit ? 'force-edit' : ''"
      >
        <!-- 输入框 -->
        <template v-if="type == 'input'">
          <el-input
            v-model.trim="form[field]"
            :placeholder="`${placeholder ? placeholder : '请输入'}`"
            :maxlength="len"
            :disabled="isDisabled"
            @change="$emit('change', form[field])"
            :clearable="isClearabled"
          ></el-input>
        </template>
        <!-- 输入框：允许空格 -->
        <template v-if="type == 'input-ignore-trim'">
          <el-input
            v-model="form[field]"
            :placeholder="`${placeholder ? placeholder : '请输入'}`"
            :maxlength="len"
            :disabled="isDisabled"
            @change="(val) => handleChangeFieldValue(val, field)"
          ></el-input>
        </template>
        <!-- 文本域输入框 -->
        <template v-if="type == 'textarea'">
          <el-input
            type="textarea"
            :row="2"
            resize="none"
            v-model.trim="form[field]"
            :placeholder="`${placeholder ? placeholder : '请输入'}`"
            :maxlength="len"
            :disabled="isDisabled"
            @change="$emit('change', form[field])"
          ></el-input>
        </template>
        <!-- 过滤输入框 -->
        <template v-if="type == 'autocomplete'">
          <el-autocomplete
            v-model.trim="form[field]"
            :placeholder="`${placeholder ? placeholder : '请输入'}`"
            :maxlength="len"
            :fetch-suggestions="autocompleteQuerySearch"
            :disabled="isDisabled"
            :clearable="clearable"
            @select="autocompleteHandleSelect"
          ></el-autocomplete>
        </template>
        <!-- 单选框 -->
        <template v-if="type == 'radio'">
          <el-radio-group
            v-model="form[field]"
            :placeholder="`${placeholder ? placeholder : '请选择'}`"
            :disabled="isDisabled"
            @change="$emit('change', form[field])"
          >
            <el-radio
              v-for="(itm, idx) in options"
              :key="idx"
              :label="itm.value"
              >{{ itm.label }}</el-radio
            >
          </el-radio-group>
        </template>
        <!-- 复选框 -->
        <template v-if="type == 'checkbox'">
          <el-checkbox-group
            v-model="form[field]"
            :placeholder="`${placeholder ? placeholder : '请选择'}`"
            :disabled="isDisabled"
            @change="$emit('change', form[field])"
          >
            <el-checkbox
              v-for="(itm, idx) in options"
              :key="`${field}_${idx}`"
              :label="itm.value"
            >
              {{ itm.label }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <!-- 下拉框 -->
        <template v-if="type == 'select'">
          <el-tooltip
            popper-class="insert-select-tooltip"
            effect="dark"
            :content="tooltip"
            placement="right"
            :disabled="!tooltip"
          >
            <el-select
              v-model="form[field]"
              :placeholder="`${placeholder ? placeholder : '请选择'}`"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
              :clearable="clearable"
            >
              <el-option
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.label"
                :value="itm.value"
                :disabled="itm.disabled"
              ></el-option>
            </el-select>
          </el-tooltip>
        </template>
        <!-- 下拉框（复选）@version V1.2.0_1.1 -->
        <template v-if="type == 'select-multiple'">
          <el-tooltip
            popper-class="insert-select-tooltip"
            effect="dark"
            :content="tooltip"
            placement="right"
            :disabled="!tooltip"
          >
            <el-select
              popper-class="select-multiple"
              v-model="form[field]"
              :placeholder="`${placeholder ? placeholder : '请选择'}`"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
              :clearable="clearable"
              multiple
            >
              <el-option
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.label"
                :value="itm.value"
                :disabled="itm.disabled"
              >
                <span>
                  <span
                    class="option-prefix"
                    :class="
                      form[field] && form[field].includes(itm.value)
                        ? 'checked'
                        : ''
                    "
                  ></span>
                  {{ itm.label }}
                </span>
              </el-option>
            </el-select>
          </el-tooltip>
        </template>
        <!-- 日期选择框  @version V1.2.0_1.1 -->
        <template v-if="type == 'date'">
          <el-date-picker
            v-model="form[field]"
            type="date"
            :picker-options="{}"
            :disabled="isDisabled"
            :placeholder="`${placeholder ? placeholder : '任意时间点'}`"
            @change="$emit('change', form[field])"
          >
          </el-date-picker>
        </template>
        <!-- 时间选择框 -->
        <template v-if="type == 'time'">
          <el-time-picker
            v-model="form[field]"
            :picker-options="{}"
            value-format="HH:mm"
            format="HH:mm"
            :disabled="isDisabled"
            :placeholder="`${placeholder ? placeholder : '任意时间点'}`"
            @change="$emit('change', form[field])"
          >
          </el-time-picker>
        </template>
        <!-- 插槽 -->
        <template v-if="type == 'slot'">
          <slot :name="field"></slot>
        </template>
      </el-form-item>
    </el-form>
    <!-- 详情：详情页、初审页不可编辑、复审页 -->
    <el-descriptions title="" v-if="readOnly || isForceEdit" :colon="false">
      <el-descriptions-item
        :label="label"
        :labelClassName="calcDescriptionsItemLabelClass"
        :contentClassName="calcDescriptionsItemContentClass"
      >
        <!-- 只展示文本 -->
        <p v-if="readOnly && !showFormItem && !typeSlot" class="checking-value">
          <template v-if="isEllipsisOfChecking && !isOverlength(newValue)">
            {{ newValue }}
          </template>
          <template v-else>
            <el-tooltip
              class="item"
              effect="dark"
              :content="newValue"
              placement="top-start"
            >
              <p>{{ calcValue() }}</p>
            </el-tooltip>
          </template>
          <slot name="checking-value-slot"></slot>
        </p>
        <!-- 展示表单元素 -->
        <div
          v-if="readOnly && showFormItem && !typeSlot"
          class="show-form-item"
        >
          <!-- 下拉框 -->
          <template v-if="type == 'select'">
            <el-select v-model="data[field]" disabled>
              <el-option
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.label"
                :value="itm.value"
              ></el-option>
            </el-select>
          </template>
          <!-- 单选框 -->
          <template v-if="type == 'radio'">
            <el-radio-group v-model="data[field]" disabled>
              <el-radio
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.value"
              >
                {{ itm.label }}
              </el-radio>
            </el-radio-group>
          </template>
          <!-- 复选框 -->
          <template v-if="type == 'checkbox'">
            <el-checkbox-group v-model="data[field]" disabled>
              <el-checkbox
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.value"
                v-show="!itm.isHide"
              >
                {{ itm.label }}
              </el-checkbox>
            </el-checkbox-group>
          </template>
          <!-- 审核：审核页存在变值 -->
          <p class="current-value show-item" v-if="existsOldValue">
            旧值：{{ oldValue }}
          </p>
        </div>
        <!-- 审核：审核页存在变值 -->
        <p
          class="current-value d-flex"
          v-if="!showFormItem && existsOldValue && !typeSlot"
        >
          旧值：
          <template v-if="isEllipsisOfCurrent">{{ oldValue }}</template>
          <el-tooltip
            v-else
            class="item"
            effect="dark"
            :content="oldValue"
            placement="top-start"
          >
            <p>{{ calcValue(1) }}</p>
          </el-tooltip>
        </p>
        <!-- 插槽 -->
        <div class="type-slot">
          <slot name="type-slot" v-if="typeSlot"></slot>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <slot></slot>
  </div>
</template>

<script>
import {
  Autocomplete,
  Descriptions,
  DescriptionsItem,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Select,
  Option,
  DatePicker,
  TimePicker,
  Tooltip,
} from "element-ui";
import { calc } from "../../utils/constant/utils";
// 说明： 空值显示
const DEFAULT_EMPTY_VALUE = "";
export default {
  components: {
    "el-autocomplete": Autocomplete,
    "el-descriptions": Descriptions,
    "el-descriptions-item": DescriptionsItem,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-input": Input,
    "el-radio-group": RadioGroup,
    "el-radio": Radio,
    "el-checkbox-group": CheckboxGroup,
    "el-checkbox": Checkbox,
    "el-select": Select,
    "el-option": Option,
    "el-time-picker": TimePicker,
    "el-date-picker": DatePicker,
    "el-tooltip": Tooltip,
  },
  props: {
    // 判断：是否可编辑
    canEdit: {
      type: Boolean,
      default: false,
    },
    // 判断：是否显示
    canVisabled: {
      type: Boolean,
      default: true,
    },
    // 判断：表单元素不可编辑
    isDisabled: {
      type: Boolean,
      default: false,
    },
    // 判断：表单元素是否可清除
    isClearabled: {
      type: Boolean,
      default: false,
    },
    // 判断： 是否为表格型表单，用于控制新旧值展示
    isTableForm: {
      type: Boolean,
      default: false,
    },
    // 如果有提示语，则展示，默认不展示
    tooltip: {
      type: String,
      default: "",
    },
    // 判断：是否只读
    readOnly: {
      type: Boolean,
      default: false,
    },
    // 判断：只读情况下，是否已表单元素方式展示
    showFormItem: {
      type: Boolean,
      default: false,
    },
    // 说明： 强制编辑，只有在readonly=true 生效
    forceEdit: {
      type: Boolean,
      default: false,
    },
    // 判断：是否忽略新旧值变动展示
    ignoreChanged: {
      type: Boolean,
      default: false,
    },
    // 判断：是否支持清空操作
    clearable: {
      type: Boolean,
      default: true,
    },
    // 表单元素类型
    type: {
      type: String,
      default: "input",
    },
    // 字段描述
    label: {
      type: String,
      default: "",
    },
    // 表单字段
    field: {
      type: String,
      require: true,
    },
    len: {
      type: Number,
    },
    // 表单对象
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 表单校验规则
    rules: {
      type: [Object],
      default: () => {
        return {};
      },
    },
    // 表单数据对象（新值）
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // 表单数据对象（旧值）
    curData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
    // 新值超出省略
    checkingEllipsis: {
      type: Number,
      default: 20,
    },
    // 旧值超出省略
    currentEllipsis: {
      type: Number,
      default: 15,
    },
    // 默认值 @version V1.2.0_1.1
    defaultVal: {
      type: [Number, String, Boolean, Array, Object],
    },
    // 最大展示长度
    // @version V1.2.0_1.1
    maxShowValueLen: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      // maxShowValueLen: 30,
    };
  },
  watch: {
    // 监听默认值 @version V1.2.0_1.1
    defaultVal: {
      handler(val) {
        if (val === 0 || val instanceof Boolean) {
          this.$set(this.form, this.field, val);
          this.$emit("change", val);
        }
      },
      immediate: true,
    },
  },
  computed: {
    /**
     * 判断： 是否存在旧值
     */
    existsOldValue() {
      let isExists = false;
      let data = this.data[this.field];
      let curData = this.curData[this.field];
      // 直接属性对比
      if (
        [
          "input",
          "input-ignore-trim",
          "autocomplete",
          "radio",
          "checkbox",
          "select",
          "select-multiple",
          "time",
        ].includes(this.type)
      ) {
        // 说明:新旧值均含值的情况比较
        if (
          typeof data !== "boolean" &&
          typeof curData !== "boolean" &&
          (!data || !curData)
        ) {
          isExists = false;
        } else if (typeof data == "boolean" || typeof curData == "boolean") {
          isExists = data !== curData;
        } else if (data instanceof Array || curData instanceof Array) {
          // 非数组
          if (!(data instanceof Array) || !(curData instanceof Array))
            isExists = true;
          // 长度不一致
          if (data.length != curData.length) isExists = true;
          // 排序后通过字符串对比
          let _data = data.sort((a, b) => a - b).join(",");
          let _curData = curData.sort((a, b) => a - b).join(",");
          isExists = _data !== _curData;
        } else {
          isExists = data !== curData;
        }
      }
      // 数组对比
      else if (data instanceof Array && curData instanceof Array) {
        // 复选框数组对比
        let len = data.length;
        let curLen = curData.length;
        // 判断：数组长度是否一致
        if (len != curLen) {
          isExists = true;
        } else {
          // 说明：若数组长度一致的情况下，则判断旧值数组中是否存在不相等的元素；
          // 说明：多个值的情况，isSameElems 不为空
          let isSameElems = curData.every((it) => data.indexOf(it) > -1);
          !isSameElems && (isExists = true);
        }
      }
      // 说明： 是否忽略变动
      if (this.ignoreChanged) isExists = false;
      // 说明： 旧值对象为空
      if (JSON.stringify(curData) == "{}") isExists = false;
      return isExists;
    },
    /**
     * 判断：是否为含枚举值表单元素；
     */
    isSelectElement: function () {
      return ["radio", "checkbox", "select"].includes(this.type);
    },
    /**
     * 查找新值： 解析只读情况下，下拉框、单选框、复选框枚举值；
     */
    readonlySelectValue: function () {
      let label = this.data[this.field];
      if (["radio", "checkbox", "select"].includes(this.type)) {
        let option = this.options.find(
          (itm) => itm.value == this.data[this.field]
        );
        option && (label = option.label);
        !option && (label = DEFAULT_EMPTY_VALUE);
      }
      return label;
    },
    /**
     * 查找旧值
     */
    readonlySelectCurValue: function () {
      let label = this.curData[this.field];
      if (["radio", "select"].includes(this.type)) {
        let option = this.options.find(
          (itm) => itm.value == this.curData[this.field]
        );
        // 说明：在选项中匹配到对应的label 则显示，否则显示"未设置"；
        option && (label = option.label);
        !option && (label = DEFAULT_EMPTY_VALUE);
      }
      // 说明：由于复选框的值为数组，故需要分开遍历查找；
      if (["checkbox"].includes(this.type)) {
        let labels = [];
        this.curData[this.field].forEach((item) => {
          let option = this.options.find((itm) => itm.value == item);
          option && labels.push(option.label);
        });
        label = labels.length == 0 ? DEFAULT_EMPTY_VALUE : labels.join("、");
      }

      return label;
    },
    /**
     * 判断：是否必填字段
     */
    isReqireField: function () {
      let flag = false;
      let rules = this.rules[this.field];
      let hadRequire = rules.find((itm) => itm.required);
      this.canEdit && hadRequire && (flag = true);
      return flag;
    },
    /**
     * 插槽
     */
    typeSlot: function () {
      return this.type == "slot";
    },
    /**
     * 新值:判断字符长度,控制文字提示显示
     */
    newValue: function () {
      let val = this.data[this.field] || DEFAULT_EMPTY_VALUE;
      // @version V1.2.0_1.1_0117 修复为0 的情况不展示问题
      if (this.data[this.field] === 0) val = 0;
      if (this.isSelectElement) val = this.readonlySelectValue;
      return val;
    },
    /**
     * 旧值:判断字符长度,控制文字提示显示
     */
    oldValue: function () {
      let val = this.curData[this.field] || DEFAULT_EMPTY_VALUE;
      if (this.isSelectElement) val = this.readonlySelectCurValue;
      return val;
    },
    /**
     * 超长显示：依赖超长字段控制
     * @version V1.1.0_0915.24
     */
    calcValue: function () {
      return (isOld) => {
        let val = isOld ? this.oldValue : this.newValue;
        let isSame = this.oldValue === this.newValue;
        let ellip = isOld ? this.curEllipsis : this.chkEllipsis;
        if (!isSame) {
          val = val.substring(0, this.calcByteIndex(val, ellip)) + "...";
        }
        if (isSame && this.isOverlength(val)) {
          val = val.substring(0, this.maxShowValueLen) + "...";
        }
        // 说明: 判断新旧值是否相同,若相同则直接返回,不省略
        return val;
      };
    },
    /**
     * 是否超长
     * @version V1.1.0_0915.25
     */
    isOverlength() {
      return (val) => this.calcLen(val) > this.maxShowValueLen;
    },
    /**
     * 说明： 编辑状态展示新旧值
     */
    isForceEdit: function () {
      return this.forceEdit && this.existsOldValue;
    },
    /**
     * 判断： 只读模式，是否以文本元素凡是展示
     */
    showTextElement: function () {
      return this.readOnly && !this.showFormItem && !this.typeSlot;
    },
    /**
     * 判断： 只读模式，是否以表单元素方式展示
     */
    showFormElement: function () {
      return this.readOnly && this.showFormItem && !this.typeSlot;
    },
    /**
     * 添加label 类名
     */
    calcDescriptionsItemLabelClass: function () {
      let className = "";
      if (!this.label) className += " hide-label";

      // 说明：新值也不能为空
      if (this.existsOldValue) className += " had-changed";

      // 说明： 编辑状态展示新旧值
      if (this.isForceEdit) className = "force-edit";

      return className;
    },
    /**
     * 添加content 类名
     */
    calcDescriptionsItemContentClass: function () {
      let className = "";
      if (this.showFormItem) className = "ignore-border";
      if (this.typeSlot) className = "type-slot";
      if (this.isForceEdit) className = "force-edit";
      return className;
    },
    /**
     * 说明： 新值超长省略字数/字节数控制
     */
    chkEllipsis: function () {
      if (this.ignoreChanged) return 50;
      return this.checkingEllipsis;
    },
    /**
     * 说明： 旧值超长省略字数/字节数控制
     */
    curEllipsis: function () {
      return this.currentEllipsis;
    },
    /**
     * 说明： 新值是否超长
     * @version V1.1.0_0915
     */
    isEllipsisOfChecking: function () {
      return (
        !this.existsOldValue || this.calcByte(this.newValue) <= this.chkEllipsis
      );
    },
    /**
     * 说明： 旧值是否超长
     */
    isEllipsisOfCurrent: function () {
      return this.calcByte(this.oldValue) <= this.curEllipsis;
    },
    /**
     * 说明： 动态添加clas
     */
    dynamicsClass() {
      let temp = "";
      if (this.type == "checkbox") temp = "checkbox-item";
      return temp;
    },
  },
  filters: {
    filter_options: function (options) {
      return options.map((item) => item.visiabled);
    },
  },
  methods: {
    /**
     * 计算字节数
     */
    calcByte(value) {
      return calc.byte(value);
    },
    /**
     * 统计中文字符数量
     * @version V1.1.0_0915.25
     */
    calcChinese(value) {
      return calc.countChinese(value);
    },
    /**
     * 计算字符串长度
     * @version V1.1.0_0915.25
     */
    calcLen(value) {
      let chineseCount = this.calcChinese(value);
      let len = value.length;
      return Math.floor(((len - chineseCount) / 7) * 4 + chineseCount);
    },
    /**
     * 获取指定字节长度索引
     */
    calcByteIndex(value, ellipsis) {
      return calc.byteIndex(value, ellipsis);
    },
    // /**
    //  * 添加label 类名
    //  */
    // calcDescriptionsItemLabelClass() {
    //   let className = "";
    //   if (!this.label) className += " hide-label";

    //   // 说明：新值也不能为空
    //   if (
    //     this.existsOldValue &&
    //     JSON.stringify(this.curData) != "{}" &&
    //     !this.ignoreChanged
    //   )
    //     className += " had-changed";

    //   // 说明： 编辑状态展示新旧值
    //   if (this.isForceEdit) className = "force-edit";

    //   return className;
    // },
    // /**
    //  * 添加content 类名
    //  */
    // calcDescriptionsItemContentClass() {
    //   let className = "";
    //   if (this.showFormItem) className = "ignore-border";
    //   if (this.typeSlot) className = "type-slot";
    //   if (this.isForceEdit) className = "force-edit";
    //   return className;
    // },
    /**
     * 过滤查询
     */
    autocompleteQuerySearch(queryString, cb) {
      let remoteFunc = this.$listeners.remote;
      // 说明： 无传入远程查询事件
      if (!remoteFunc) {
        var options = this.options;
        var results = queryString
          ? options.filter(createFilter(queryString))
          : options;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
      if (remoteFunc) {
        remoteFunc(queryString, cb);
      }

      // 所属国别过滤函数
      function createFilter() {
        return (option) => {
          return (
            option.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
          );
        };
      }
    },
    /**
     * 过滤选择
     */
    autocompleteHandleSelect(val) {
      this.$emit("select", val);
    },
    /**
     * 允许空格输入
     */
    handleChangeFieldValue(val, field) {
      this.$set(this.form, field, val.trim());
      this.$emit("change", val.trim());
    },
  },
};
</script>

<style lang="less" scoped>
@ERROR_COLOR: #f56c6c;
@INFO_COLOR: #606266;
.insert-select-form-item {
  display: flex;
  align-items: center;
  &.checkbox-item{
    /deep/.el-form-item__error{
      width: 84px;
    }
  }

  /deep/input {
    width: 200px;
  }
  // 表单
  @el-item: el-form-item;
  .el-form {
    .@{el-item}{
      display: flex;
      margin-bottom: 24px;
      &.force-edit{
         /deep/.@{el-item}__label {
          &::before {
            content: "※";
            display: inline-block;
            width: 10px;
            height: 10px;
            padding-right: 5px;
            color: @ERROR_COLOR;
          }
        }
      }
    }
    /deep/.@{el-item}__label {
      width: 420px;
      text-align: left;
    }
    /deep/.@{el-item}__content {
      position: relative;
      input , textarea{
        width: 400px;
      }
      textarea{
        font-family: '微软雅黑';
        font-size: 13px;
      }
    }
    /deep/.@{el-item}__error {
      @ERR_BG: #fff;
      @ERR_BC: #fbb;
      position: absolute;
      top: 43px;
      z-index: 1000;
      height: 18px;
      padding: 0px 5px;
      line-height: 18px;
      font-size: 12px;
      color: @ERROR_COLOR;
      background: @ERR_BG;
      border-radius: 3px;
      box-sizing: content-box;
      border: 1px solid @ERR_BC;
      &::before {
        content: "";
        position: absolute;
        top: -3px;
        left: 5px;
        display: block;
        width: 4px;
        height: 4px;
        background: @ERR_BG;
        border-top: 1px solid @ERR_BC;
        border-left: 1px solid @ERR_BC;
        transform: rotate(45deg);
      }
    }
    /deep/.el-textarea + .@{el-item}__error{
      top: 54px;
    }
  }

  // 详情
  @el-desc: el-descriptions-item;
  .el-descriptions {

    /deep/.@{el-desc}__cell {
      // padding-bottom: 0px;
    }
    /deep/.@{el-desc}__container {
      position: relative;
      height: 40px;
      line-height: 40px;
    }
    /deep/.@{el-desc}__label {
      width: 420px;
      &.hide-label {
        display: none;
      }
      &.had-changed {
        &::before {
          content: "※";
        display: inline-block;
        width: 10px;
        height: 10px;
        padding-right: 5px;
        color: @ERROR_COLOR;
        }
      }
      &.force-edit {
        display: none;
      }
    }
    /deep/.@{el-desc}__content {
      display: flex;
      &:not(.ignore-border) {
        // border: 1px solid #ddd;
        border-radius: 4px;
        text-indent: 10px;
      }
      &.type-slot {
        border: none;
        .type-slot {
          width: 412px;
        }
      }
      // 当前值
      .checking-value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 400px;
        // background: #f6f6f6;
        // color: #888;
        // margin-right: 10px;
      }
      // 旧值
      .current-value {
        color: @ERROR_COLOR;
      }
      // 只读展示表单元素
      .show-form-item {
        position: relative;
        min-width: 150px;
        // 存在旧值下侧提示框
        .current-value {
          position: absolute;
          top: 34px;
          z-index: 100;
          height: 18px;
          padding: 0px 5px;
          line-height: 18px;
          font-size: 12px;
          color: #f56c6c;
          background: #fff;
          border-radius: 3px;
          box-sizing: content-box;
          border: 1px solid #fbb;
          &::before {
            content: "";
            position: absolute;
            top: -3px;
            left: 5px;
            display: block;
            width: 4px;
            height: 4px;
            background: #fff;
            border-top: 1px solid #fbb;
            border-left: 1px solid #fbb;
            transform: rotate(45deg);
          }
        }
        @radio: el-radio;
        .@{radio}__input.is-checked {
          .@{radio}__inner {
          border-color: @INFO_COLOR;
            &::after {
              background-color: @INFO_COLOR;
            }
          }
          &+.@{radio}__label {
            color: @INFO_COLOR;
          }
        }
        @checkbox: el-checkbox;
        .@{checkbox}-group {
          height: 40px;
        }
        .@{checkbox}__input.is-checked {
          .@{checkbox}__inner {
          border-color: @INFO_COLOR;
            &::after {
              border-color: @INFO_COLOR;
            }
          }
          &+.@{checkbox}__label {
            color: @INFO_COLOR;
          }
        }
      }
       &.force-edit {
        position: absolute;
        top: -10px;
      }

    }
  }
}
// V1.2.0_1.1
.select-multiple {
  .el-select-dropdown__item {
    & > span {
      display: flex;
      align-items: center;
    }
  }
  .option-prefix {
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 10px;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    &.checked {
      background-color: #409eff;
      border-color: #409eff;
      &::after {
        box-sizing: content-box;
        content: "";
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        transform: rotate(45deg);
        width: 3px;
        transition: transform 0.15s ease-in 0.05s;
        transform-origin: center;
      }
    }
  }
}
</style>
