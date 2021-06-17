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
      viewDisplay: false
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
      prop: 'phoneNumber',
      rules: [
        { min: 11, max: 11,message: '长度在 11 个字符',trigger: 'blur'}
      ]
    },
    {
      label: '汽车品牌',
      prop: 'brandId',
      type: 'select',
      dataType:'string',
      filterable:true,
      dicUrl: '/gate/diccarbrand/getAllCarBrandPage',
      search: true,
      props:{
        label:'name',
        value:'id'
      },
      rules: [
        { required: true, message: '请输入汽车品牌', trigger: 'change'},
      ]
    },
    {
      label: '车辆类型',
      prop: 'type',
      type: 'select',
      search: true,
      // formslot:true,
      rules: [{
        required: true,
        message: '请选择车辆类型',
        trigger: 'change'
      }],
      props:{
        label:'name',
        value:'id'
      },
      dicData: []
    },
    {
      label: '添加时间',
      prop: 'createDate',
      type: 'date',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '原因',
      prop: 'remarks',
      span: 24,
      type:'textarea',
      rules: [
        { required: true, message: '请输入拉黑原因', trigger: 'blur'},
      ]
    },
    // {
    //   label: '操作账号',
    //   prop: 'username',
    //   span: 24,
    //   editDisplay: false,
    //   addDisplay: false
    // }
  ]
}
