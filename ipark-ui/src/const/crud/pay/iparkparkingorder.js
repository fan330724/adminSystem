export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 5,
  align: 'center',
  addBtn: false,
  viewBtn: false,
  editBtn: false,
  delBtn: false,
  searchBtnText: '查询',
  menuWidth: 280,
  column: [
    {
      label: 'id',
      prop: 'id',
      hide: true,
      editDisabled: true,
      editDisplay: false,
      addDisplay: false
    },
    {
      label: '车牌号',
      prop: 'plate_number',
      search: true,
      minWidth: 150,
      fixed: true,
      slot: true,
    },
    {
      label: '汽车品牌',
      prop: 'name',
      type: 'select',
      search: true,
      searchPlaceholder: "请选择汽车品牌",
      dicUrl: "",
      props: {
        label: "name",
        value: "id"
      },
    },
    {
      label: '车辆类型',
      prop: 'typeName',
      type: 'select',
      searchPlaceholder: "请选择车辆类型",
      border: true,
      dicUrl: '',
      search: true,
      props: {
        label: 'name',
        value: 'id'
      },
    },
    {
      label: '入场时间',
      prop: 'in_time',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      border: true,
      minWidth: 160
    },
    {
      label: '入场岗亭',
      prop: 'entry_gate_name',
      border: true,
    },
    {
      label: '出场时间',
      prop: 'out_time',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      minWidth: 160
    },
    {
      label: '出场岗亭',
      prop: 'out_gate_name',
    },
    {
      label: '停车时长',
      prop: 'Duration',
      minWidth: 100
    },
    {
      label: '实收金额(元)',
      prop: 'total',
      minWidth: 100
    },
    {
      label: '支付方式',
      prop: 'pay_type_code',
      type: 'select',
      search: true,
      searchPlaceholder: "请选择支付方式",
      minWidth: 90,
      dicData: [
        // {
        //   label: "微信",
        //   value: "wxpay"
        // },
        {
          label: "无费用",
          value: "nofee"
        },
        // {
        //   label: "支付宝",
        //   value: "alipay"
        // },
        {
          label: "小程序支付",
          value: "wxxpay"
        },
        {
          label: "现金",
          value: "XIANJIN"
        },
        // {
        //   label: "小浦支付",
        //   value: "spdbpay"
        // },
        // {
        //   label: "威富通",
        //   value: "wfy_wxpay"
        // },
        // {
        //   label: "钱包支付",
        //   value: "wallet"
        // },
        // {
        //   label: "银联支付",
        //   value: "unionpay"
        // }
      ]
    },
    {
      label: '车辆状态',
      prop: 'status',
      border: true,
    },
    {
      label: '支付状态',
      prop: 'order_status',
      border: true,
    },
    {
      label: '车牌识别',
      prop: 'exist',
      type: 'select',
      search: true,
      searchPlaceholder: "请选择车牌识别",
      dicData: [
        {
          label: "自动识别",
          value: 'Y'
        },
        {
          label: "扫码录入",
          value: "N"
        },
      ]
    },
    {
      label: '备注',
      prop: 'remark',
      minWidth: 380
    },
  ]
}

