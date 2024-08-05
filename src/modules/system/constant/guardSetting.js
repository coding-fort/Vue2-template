/**
 * 常用挡板配置
 */
const guardSetting = {
  // busiType 业务类型：100-商户进件 103-电子交易信息 105 交易指令
  // merchantType 商户类型：1-居民 2-企业
  // edgeStatus 贸易资质校验状态：1-通过 2-不通过 3-异常 4-校验中 5-失败
  // tradeValidResult 贸易资质校验结果： A/B/C/None
  // idAuthStatus 身份校验状态：1-通过 2-不通过 3-异常 4-校验中 5-失败
  // citiScreenValidStatus CitiScreen校验状态：1-通过 2-不通过 3-异常 4-校验中 5-失败
  // citiScreenValidResult CitiScreen校验结果：NoMatch/PotentialMatch/FALSEMATCH/CANCEL/..
  // blacklistStatus 是否命中个人结售汇重点监管名单：1-命中 0-未命中
  merchant: {
    busiType: "100",
    cropN: {
      merchantType: 2,
      edgeStatus: 1,
      edgeDesc: "贸易资质校验通过",
      edgeResult: "None",
      idAuthStatus: 1,
      idAuthDesc: "身份校验通过",
      citiscreenStatus: 1,
      citiscreenResult: "No Match",
      citiscreenDesc: "CitiScreen 校验通过",
    },
    cropA: {
      merchantType: 2,
      edgeStatus: 1,
      edgeDesc: "贸易资质校验通过",
      edgeResult: "A",
      idAuthStatus: 1,
      idAuthDesc: "身份校验通过",
      citiscreenStatus: 1,
      citiscreenResult: "No Match",
      citiscreenDesc: "CitiScreen 校验通过",
    },
    cropB: {
      merchantType: 2,
      edgeStatus: 2,
      edgeDesc: "贸易资质校验不通过",
      edgeResult: "B",
      idAuthStatus: 1,
      idAuthDesc: "身份校验通过",
      citiscreenStatus: 1,
      citiscreenResult: "No Match",
      citiscreenDesc: "CitiScreen 校验通过",
    },
    cropC: {
      merchantType: 2,
      edgeStatus: 2,
      edgeDesc: "贸易资质校验不通过",
      edgeResult: "C",
      idAuthStatus: 1,
      idAuthDesc: "身份校验通过",
      citiscreenStatus: 1,
      citiscreenResult: "No Match",
      citiscreenDesc: "CitiScreen 校验通过",
    },
    persH: {
      merchantType: 1,
      idAuthStatus: 1,
      idAuthDesc: "身份校验通过",
      citiscreenStatus: 1,
      citiscreenResult: "No Match",
      citiscreenDesc: "CitiScreen 校验通过",
      blacklistStatus: 1,
    },
    persN: {
      merchantType: 1,
      idAuthStatus: 1,
      idAuthDesc: "身份校验通过",
      citiscreenStatus: 1,
      citiscreenResult: "No Match",
      citiscreenDesc: "CitiScreen 校验通过",
      blacklistStatus: 0,
    },
  },
  order: {
    busiType: "103",
    orderN: {
      citiscreenStatus: 1,
      citiscreenResult: "No Match",
      citiscreenDesc: "CitiScreen 校验通过",
    },
    orderH: {
      citiscreenStatus: 2,
      citiscreenResult: "Cancel",
      citiscreenDesc: "CitiScreen 校验不通过",
    },
  },
  payment: {
    busiType: "105",
    otcCancel: {
      tradeType: "OTC",
      payStatus: "CANCELED",
    },
    otcPending: {
      tradeType: "OTC",
      payStatus: "Pending",
    },
    rxbCancel: {
      tradeType: "RXB",
      payStatus: "CANCELED",
    },
    rxbPending: {
      tradeType: "RXB",
      payStatus: "Pending",
    },
    giroCancel: {
      tradeType: "GIRO",
      payStatus: "D",
    },
    giroPending: {
      tradeType: "GIRO",
      payStatus: "Pending",
    },
  },
};

export default guardSetting;
