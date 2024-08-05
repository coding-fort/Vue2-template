<template>
  <div class="query-form-item">
    <!-- 初审：初审页可编辑 -->
    <el-form ref="form" :model="form" :rules="rules" v-if="canEdit">
      <el-form-item :label="label" :prop="field" class="edit-field">
        <!-- 插槽 -->
        <template>
          <!-- 输入框 -->
          <template v-if="type == 'input'">
            <el-input
              v-model.trim="form[field]"
              placeholder="请输入"
              clearable
              :disabled="isDisabled"
              :maxlength="len"
              @change="$emit('change', form[field])"
            ></el-input>
          </template>
          <!-- 范围输入框 -->
          <template v-if="type == 'inputrange'">
            <es-input-range
              :value.sync="form[field]"
              placeholder="请输入"
              clearable
              :disabled="isDisabled"
              :maxlength="len"
              @change="$emit('change', form[field])"
            ></es-input-range>
          </template>
          <!-- 过滤输入框 -->
          <template v-if="type == 'autocomplete'">
            <el-autocomplete
              v-model="form[field]"
              placeholder="请输入"
              :maxlength="len"
              clearable
              :disabled="isDisabled"
              :fetch-suggestions="autocompleteQuerySearch"
              @select="autocompleteHandleSelect"
              @change="$emit('change', form[field])"
            ></el-autocomplete>
          </template>
          <!-- 单选框 -->
          <template v-if="type == 'radio'">
            <el-radio-group
              v-model="form[field]"
              placeholder="请选择"
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
              placeholder="请选择"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
              <el-checkbox
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.value"
                >{{ itm.label }}</el-checkbox
              >
            </el-checkbox-group>
          </template>
          <!-- 下拉框 -->
          <template v-if="type == 'select'">
            <el-select
              v-model="form[field]"
              placeholder="请选择"
              clearable
              :multiple="multiple"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
              @clear="$emit('clear', form[field])"
            >
              <el-option
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.label"
                :value="itm.value"
              ></el-option>
            </el-select>
          </template>
          <!-- 日期选择框 -->
          <template v-if="type == 'year'">
            <el-date-picker
              v-model="form[field]"
              type="year"
              :picker-options="{}"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-date-picker>
          </template>
          <!-- 日期选择框 -->
          <template v-if="type == 'date'">
            <el-date-picker
              v-model="form[field]"
              :picker-options="{}"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-date-picker>
          </template>
          <!-- 日期（复选）选择框 -->
          <template v-if="type == 'date-multiple'">
            <el-date-picker
              v-model="form[field]"
              type="dates"
              placeholder="请选择"
              :picker-options="{}"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-date-picker>
          </template>
          <!-- 日期范围选择框 -->
          <template v-if="type == 'daterange'">
            <el-date-picker
              v-model="form[field]"
              type="daterange"
              :picker-options="pickerOptions"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-date-picker>
          </template>
          <!-- 月份范围选择框 -->
          <template v-if="type == 'month'">
            <el-date-picker
              v-model="form[field]"
              type="month"
              :picker-options="pickerOptions"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-date-picker>
          </template>
          <!-- 多月份选择框 -->
          <template v-if="type == 'months'">
            <el-date-picker
              class="date-months"
              v-model="form[field]"
              type="months"
              :picker-options="pickerOptions"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-date-picker>
          </template>
          <!-- 月份范围选择框 -->
          <template v-if="type == 'monthrange'">
            <el-date-picker
              v-model="form[field]"
              type="monthrange"
              :picker-options="pickerOptions"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-date-picker>
          </template>
          <!-- 日期时间范围选择框 -->
          <template v-if="type == 'datetimerange'">
            <el-date-picker
              v-model="form[field]"
              type="datetimerange"
              :picker-options="pickerOptions"
              :disabled="isDisabled"
              :default-time="['00:00:00', '23:59:59']"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
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
              placeholder="任意时间点"
              :disabled="isDisabled"
              @change="$emit('change', form[field])"
            >
            </el-time-picker>
          </template>
          <!-- 插槽 -->
          <template v-if="type == 'slot'">
            <slot :name="field" :props="$props"></slot>
          </template>
        </template>
      </el-form-item>
    </el-form>
    <!-- 详情：详情页、初审页不可编辑、复审页 -->
    <el-descriptions title="" v-if="readOnly" :colon="false">
      <el-descriptions-item
        :label="label"
        :labelClassName="calcDescriptionsItemLabelClass()"
        :contentClassName="showFormItem ? 'ignore-border' : ''"
      >
        <!-- 只展示文本 -->
        <p class="checking-value" v-if="readOnly && !showFormItem">
          {{
            isSelectElement
              ? readonlySelectValue
              : data[field]
              ? data[field]
              : ""
          }}
        </p>
        <!-- 展示表单元素 -->
        <div v-if="readOnly && showFormItem" class="show-form-item">
          <!-- 单选框 -->
          <template v-if="type == 'radio'">
            <el-radio-group v-model="data[field]" disabled>
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
            <el-checkbox-group v-model="data[field]" disabled>
              <el-checkbox
                v-for="(itm, idx) in options"
                :key="idx"
                :label="itm.value"
                >{{ itm.label }}</el-checkbox
              >
            </el-checkbox-group>
          </template>
          <!-- 审核：审核页存在变值 -->
          <p
            class="current-value show-item"
            v-if="
              existsOldValue &&
              JSON.stringify(curData) != '{}' &&
              !ignoreChanged
            "
          >
            旧值：{{
              isSelectElement
                ? readonlySelectCurValue
                : curData[field]
                ? curData[field]
                : ""
            }}
          </p>
        </div>
        <!-- 审核：审核页存在变值 -->
        <p
          class="current-value"
          v-if="
            !showFormItem &&
            existsOldValue &&
            JSON.stringify(curData) != '{}' &&
            !ignoreChanged
          "
        >
          旧值：{{
            isSelectElement
              ? readonlySelectCurValue
              : curData[field]
              ? curData[field]
              : ""
          }}
        </p>
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
} from "element-ui";
import esInputRange from "@/components/inputRange";
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
    esInputRange,
  },
  props: {
    // 判断：是否可编辑
    canEdit: {
      type: Boolean,
      default: false,
    },
    // 判断：表单演示不可编辑
    isDisabled: {
      type: Boolean,
      default: false,
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
    // 判断：是否忽略新旧值变动展示
    ignoreChanged: {
      type: Boolean,
      default: false,
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
      type: Object,
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
    // 复选
    multiple: {
      type: Boolean,
      default: false,
    },
    // 日期控件控制
    datePicker: {
      type: String,
      default: "",
    },
    //
    picker: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // 是否存在旧值
    existsOldValue: function () {
      let isExists = false;
      let data = this.data[this.field];
      let curData = this.curData[this.field];

      // 直接属性对比
      if (["input", "radio", "select", "time"].includes(this.type)) {
        isExists = data !== curData;
      } else if (data instanceof Array && curData instanceof Array) {
        // 复选框数组对比
        let len = data.length;
        let curLen = curData.length;
        // 判断：数组长度是否一致
        if (len != curLen) {
          isExists = true;
        } else {
          // 说明：若数组长度一致的情况下，则判断旧值数组中是否存在不相等的元素；
          data.forEach((itm) => {
            let isSameElems = curData.filter((it) => it != itm);
            isSameElems.length > 0 && (isExists = true);
          });
        }
      }
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
        !option && (label = "");
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
        !option && (label = "");
      }
      // 说明：由于复选框的值为数组，故需要分开便利查找；
      if (["checkbox"].includes(this.type)) {
        let labels = [];
        this.curData[this.field].forEach((item) => {
          let option = this.options.find((itm) => itm.value == item);
          option && labels.push(option.label);
        });
        label = labels.join("、");
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
     * 获取当前日期时间戳
     */
    getDateNow: function () {
      let now = new Date(
        new Date(Date.now()).toLocaleDateString() + " 23:59:59"
      ).getTime();
      return () => now;
    },
    /**
     * 日期限定
     */
    pickerOptions: function () {
      // 不可选择限制
      let disableDateOptions = {
        // 直到现在，不含当天
        tillNowOn: (time) => {
          return time.getTime() > this.getDateNow() - 86400 * 1000 * 1;
        },
        // 直到现在，含当天
        tillNowOnInclude: (time) => {
          return time.getTime() > this.getDateNow() - 86400 * 1000 * 0;
        },
        // 始于现在，不含当天
        fromNowOn: (time) => {
          return time.getTime() < this.getDateNow() - 86400 * 1000 * 0;
        },
        // 始于现在，含当天
        fromNowOnInclude: (time) => {
          return time.getTime() < this.getDateNow() - 86400 * 1000 * 1;
        },
      };
      // 说明： 内置校验规则
      let _defaultPicker = disableDateOptions[this.datePicker];
      // 说明： 传入校验规则
      let { defaultPicker, disabledPicker } = this.picker;
      // 说明： 传入规则匹配内置规则
      if (defaultPicker && disableDateOptions[defaultPicker]) {
        _defaultPicker = (time) => {
          let __defaultPicker = disableDateOptions[defaultPicker](time);
          // 说明： 存在额外自定义校验
          if (disabledPicker) {
            let __customPicker = disabledPicker(time);
            if (
              [
                "tillNowOn",
                "tillNowOnInclude",
                "fromNowOn",
                "fromNowOnInclude",
              ].includes(defaultPicker)
            ) {
              if (__defaultPicker) return __defaultPicker;
              if (!__defaultPicker) return __customPicker;
            } else {
              return (
                disableDateOptions[defaultPicker](time) && disabledPicker(time)
              );
            }
          }
          if (!disabledPicker) return __defaultPicker;
        };
      }
      // 说明：未传入内置规则，或未匹配内置规则，且设置自定义校验规则
      if (
        (!defaultPicker || !disableDateOptions[defaultPicker]) &&
        disabledPicker
      ) {
        _defaultPicker = (time) => disabledPicker(time);
      }
      let picker = { disabledDate: _defaultPicker || {} };
      return picker;
    },
  },
  methods: {
    /**
     * 添加label 类名
     */
    calcDescriptionsItemLabelClass() {
      let className = "";
      if (!this.label) {
        className += " hide-label";
      }
      if (
        this.existsOldValue &&
        JSON.stringify(this.curData) != "{}" &&
        !this.ignoreChanged
      ) {
        className += " had-changed";
      }
      return className;
    },
    /**
     * 过滤查询
     */
    autocompleteQuerySearch(queryString, cb) {
      var options = this.options;
      var results = queryString
        ? options.filter(createFilter(queryString))
        : options;
      // 调用 callback 返回建议列表的数据
      cb(results);

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
  },
};
</script>

<style lang="less" scoped>
@ERROR_COLOR: #f56c6c;
@INFO_COLOR: #606266;
.query-form-item {
  display: flex;
  align-items: center;
  /deep/input {
    width: 200px;
  }
  // 表单
  @el-item: el-form-item;
  .el-form {
    width: 100%;
    .@{el-item}{
      width: 100% !important;
      display: flex;
      flex-direction: column;
    }
    /deep/.@{el-item}__label {
      // width: 420px;
      text-align: left;
    }
    /deep/.@{el-item}__content {
      input, .el-range-editor.el-input__inner, .el-date-editor {
        width: 100%;
      }
      input:read-only{
        color: #606266;
        background-color: #fff;
        cursor: default;
      }
    }
  }

  // 详情
  @el-desc: el-descriptions-item;
  .el-descriptions {
    /deep/.@{el-desc}__container {
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
    }
    /deep/.@{el-desc}__content {
      display: flex;
      &:not(.ignore-border) {
        border: 1px solid #ddd;
        border-radius: 4px;
        text-indent: 10px;
      }
      // 当前值
      .checking-value {
        width: 400px;
        margin-right: 10px;
      }
      // 旧值
      .current-value {
        color: @ERROR_COLOR;
      }
      // 只读展示表单元素
      .show-form-item {
        position: relative;
        min-width: 100px;
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
    }
  }
}
</style>
