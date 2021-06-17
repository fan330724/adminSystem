import {rule} from '@/util/validateRules'

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
  column: [
    {
      label: '车辆id',
      prop: 'id',
      hide: true,
      editDisabled: true,
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false
    },
    {
      label: '车牌号',
      prop: 'plateNumber',
      search: true,
      formslot:true,
      rules: [
        { required: true, message: '请输入车牌号', trigger: 'blur'},
        { validator: rule.validPlatNumber, trigger: 'blur' },
      ]
    },
    {
      label: '手机号',
      prop: 'telphone',
      rules: [{
        min: 11,
        max: 11,
        message: '长度在 11 个字符',
        trigger: 'blur'
      }]
    },
    {
      label: '汽车品牌',
      prop: 'carBrand',
      type: 'select',
      dataType:'string',
      // filterable:true,
      dicUrl: '/gate/diccarbrand/getAllCarBrandPage',
      search: true,
      props:{
        label:'name',
        value:'id'
      },
      rules: [
        { required: true, message: '请选择汽车品牌', trigger: 'change'},
      ]
    },
    {
      label: '车辆类型',
      prop: 'carType',
      // formslot: true,
      // slot: true,
      // span: 24,
      type: 'select',
      search: true,
      rules: [{
        required: true,
        message: '请选择车辆类型',
        trigger: 'change'
      }],
      props:{
        label:'name',
        value:'id'
      },
      dicUrl: '/gate/cartype/nopage'
      // dicData: carTypeList
    },
    {
      label: '开始时间',
      prop: 'startDate',
      type: 'date',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      search: true,
      rules: [{
        required: true,
        message: '请输入开始时间',
        trigger: 'blur'
      }]
    },
    {
      label: '到期时间',
      prop: 'expireDate',
      type: 'date',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      search: true,
      rules: [{
        required: true,
        message: '请输入结束时间',
        trigger: 'blur'
      }]
    },
    {
      label: '车主姓名',
      prop: 'name',
      hide:true,
      row:true,
      // rules: [
      //   { required: true, message: '请输车主姓名', trigger: 'blur'}
      // ]
    },
    {
      type:'textarea',
      minRows:2,
      row:true,
      label: '备注',
      prop: 'remark'
    }
  ]
}
