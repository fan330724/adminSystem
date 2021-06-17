export const tableOption = {
  border: false,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 5,
  // searchSpan: 5,
  align: 'center',
  addBtn: false,
  viewBtn: false,
  editBtn: false,
  delBtn: false,
  searchBtnText: '查询',
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
    },
    {
      label: '出场时间',
      prop: 'out_time',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
    },
    {
      label: '出场岗亭',
      prop: 'out_gate_name',
    },
    {
      label: '停车时长',
      prop: 'Duration',
    },
    {
      label: '应付金额',
      prop: 'money',
    },
    {
      label: '减免金额',
      prop: 'dearte_total',
    },
    {
      label: '实付金额',
      prop: 'total',
    },
    {
      label: '支付方式',
      prop: 'pay_type_code',
      type: 'select',
      search: true,
      searchPlaceholder: "请选择支付方式",
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
      label: '支付状态',
      prop: 'order_status',
      border: true,
      search:true,
      type: "select",
      dicData: [
        {
          label: "已支付",
          value: 4
        },
        {
          label: "未支付",
          value: 2
        }
      ]
    },
    {
      label: '岗亭负责人',
      prop: 'outPeopleName',
      border: true,
    },
    {
      label: '备注',
      prop: 'remark',
      minWidth: 160
    },
    {
      label: '对帐失败原因',
      prop: 'exist_reason',
      minWidth: 150
    },
  ]
}

