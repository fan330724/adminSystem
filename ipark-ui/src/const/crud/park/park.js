import store from '@/store/index'
let userId = store.getters.userInfo.userId;
import { rule } from '@/util/validateRules'

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  align: 'center',
  addBtn: true,
  editBtn: true,
  viewBtn: true,
  labelWidth:190,
  dialogWidth:'55%',
  column: [
    {
      label: '车场名称',
      prop: 'name',
      search: true,
      rules: [
        { required: true, message: '请输入车场名称', trigger: 'blur'}
      ]
    },
    {
      label: '车场编码',
      prop: 'code',
      editDisabled:true,
      // editDisplay: false,
      // addDisplay: false,
      // viewDisplay:false,
      hide:true,
      rules: [
        { required: true, message: '请输入车场编码', trigger: 'blur'}
      ]
    },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      hide:true,
      search: true,
      rules: [{
        required: true,
        message: '开启状态',
        trigger: 'change'
      }],
      dicData: [{
        label: '开启',
        value: 'Y'
      }, {
        label: '关闭',
        value: 'N'
      }]
    },
    {
      label: '地址',
      prop: 'address'
    },
    {
      label: '经度',
      prop: 'lon'
    },
    {
      label: '纬度',
      prop: 'lat'
    },
    
    // {
    //   label: '是否全天',
    //   prop: 'existAllDay',
    //   type: 'select',
    //   editDisplay: false,
    //   addDisplay: false,
    //   viewDisplay:false,
    //   rules: [{
    //     required: true,
    //     message: '是否全天',
    //     trigger: 'change'
    //   }],
    //   dicData: [{
    //     label: '是',
    //     value: 'Y'
    //   }, {
    //     label: '不是',
    //     value: 'N'
    //   }
    // ]
    // },
    {
      label: '停车场类型',
      prop: 'parkType',
      type: 'select',
      // rules: [{
      //   required: true,
      //   message: '请选择停车场类型',
      //   trigger: 'change'
      // }],
      dicData: [{
        label: '地上',
        value: '1'
      }, {
        label: '地下',
        value: '2'
      }
    ]
    },
    {
      label: '总车位',
      type: 'number',
      prop: 'space',
      rules: [
        { required: true, message: '请输入总车位', trigger: 'blur'},
      ]
    },
    {
      label: '空余车位',
      prop: 'emptySpace',
      type:'number',
      // rules: [
      //   { required: false, message: '请输入空余车位', trigger: 'blur'},
      // ]
    },
    {
      label: '带充电桩车位数',
      prop: 'chargingPileSpace',
      type:'number',
      // rules: [
      //   { required: false, message: '请输入带充电桩车位数', trigger: 'blur'},
      // ]
    },
    {
      label: '智能锁车位数',
      prop: 'intelligentLockSpace',
      type:'number',
      // rules: [
      //   { required: false, message: '请输入智能锁车位数', trigger: 'blur'},
      // ]
    },
    {
      label: '出租车是否免费',
      prop: 'existFreeTaxi',
      type: 'select',
      hide:true,
      // editDisplay: false,
      // addDisplay: false,
      // viewDisplay:false,
      // rules: [{
      //   required: true,
      //   message: '是否固定车同时进入',
      //   trigger: 'change'
      // }],
      dicData: [{
        label: '免费',
        value: 'Y'
      }, {
        label: '不免费',
        value: 'N'
      }]
    },
    {
      label: '新能源车是否免费',
      prop: 'existFreeNewEnergy',
      type: 'select',
      hide:true,
      // editDisplay: false,
      // addDisplay: false,
      // viewDisplay:false,
      // rules: [{
      //   required: true,
      //   message: '是否固定车同时进入',
      //   trigger: 'change'
      // }],
      dicData: [{
        label: '免费',
        value: 'Y'
      }, {
        label: '不免费',
        value: 'N'
      }]
    },
    {
      label: '分成比例',
      prop: 'proportion',
      type:'number',
      hide:true,
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false,
      // rules: [
      //   { required: true, message: '请输入空余车位', trigger: 'blur'},
      // ]
    },
    // {
    //   label: '是否固定车同时进入',
    //   prop: 'existFixedIn',
    //   type: 'select',
    //   hide:true,
    //   editDisplay: false,
    //   addDisplay: false,
    //   viewDisplay:false,
    //   // rules: [{
    //   //   required: true,
    //   //   message: '是否固定车同时进入',
    //   //   trigger: 'change'
    //   // }],
    //   dicData: [{
    //     label: '可以进入',
    //     value: 'Y'
    //   }, {
    //     label: '不可进入',
    //     value: 'N'
    //   }]
    // },
    {
      label: '是否合作车场',
      prop: 'existWeiwoPark',
      type: 'select',
      hide:true,
      // rules: [{
      //   required: true,
      //   message: '是否合作车场',
      //   trigger: 'change'
      // }],
      dicData: [{
        label: '是',
        value: 'Y'
      }, {
        label: '否',
        value: 'N'
      }]
    },
    {
      label: '是否分享车场',
      prop: 'existFxpark',
      type: 'select',
      hide:true,
      // rules: [{
      //   required: true,
      //   message: '是否合作车场',
      //   trigger: 'change'
      // }],
      dicData: [{
        label: '是',
        value: 'Y'
      }, {
        label: '否',
        value: 'N'
      }]
    },
    {
      label: '是否托管车场',
      prop: 'trustee',
      type: 'select',
      hide:true,
      // rules: [{
      //   required: true,
      //   message: '是否托管车场',
      //   trigger: 'change'
      // }],
      dicData: [{
        label: '是',
        value: 'Y'
      }, {
        label: '否',
        value: 'N'
      }]
    },
    {
      label: '场地类型',
      prop: 'parkSort',
      type: 'select',
      hide:true,
      // rules: [{
      //   required: true,
      //   message: '请选择场地类型',
      //   trigger: 'change'
      // }],
      dicData: [{
        label: '商业',
        value: 'S'
      }, {
        label: '住宅',
        value: 'Z'
      }]
    },
    {
      label: '车场负责人',
      prop: 'chargePerson'
    },
    {
      label: '联系电话',
      prop: 'chargePhone',
      // rules:[
      //   { validator: rule.validatorPhone, trigger: 'blur' }
      // ]
    },
    {
      label: '是否支持提前付',
      prop: 'existScan',
      formslot:true,
      hide:true,
      // rules: [{
      //   required: true,
      //   message: '是否支持提前付',
      //   trigger: 'change'
      // }],
    },
    {
      label: '提前支付扫码出场时间',
      prop: 'scanOutTime',
      formslot:true,
      hide:true
    },   
    {
      label: '合作开始时间',
      prop: 'cooperateBegin',
      type: 'datetime',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      addDisplay: true,
      editDisplay: true,
      hide:true,
      // rules: [{
      //   required: true,
      //   message: '请输入开始时间',
      //   trigger: 'blur'
      // }]
    },
    {
      label: '合作结束时间',
      prop: 'cooperateEnd',
      type: 'datetime',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      addDisplay: true,
      editDisplay: true,
      hide:true,
      // rules: [{
      //   required: true,
      //   message: '请输入开始时间',
      //   trigger: 'blur'
      // }]
    },
    {
      label: '创建人',
      prop: 'createBy',
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false,
      hide:true
    },
    {
      label: '创建时间',
      prop: 'createDate',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm',
      valueFormat: 'yyyy-MM-dd hh:mm',
      addDisplay: false,
      editDisplay: false,
      viewDisplay:false,
      hide:true
    },
    {
      label: '更新人',
      prop: 'updateBy',
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false,
      hide:true
    },
    {
      label: '更新时间',
      prop: 'updateDate',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm',
      valueFormat: 'yyyy-MM-dd hh:mm',
      addDisplay: false,
      editDisplay: false,
      viewDisplay:false,
      hide:true
    },
  ]
}
