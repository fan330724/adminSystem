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
      formslot:true,
      search: true,
      rules: [
        { required: true, message: '请输入车牌号', trigger: 'blur'},
        { validator: rule.validPlatNumber, trigger: 'blur' },
      ]
    },
    // {
    //   label: '汽车品牌',
    //   prop: 'brandId',
    //   type: 'select',
    //   dataType:'string',
    //   filterable:true,
    //   dicUrl: '/gate/diccarbrand/getAllCarBrandPage',
    //   search: true,
    //   props:{
    //     label:'name',
    //     value:'id'
    //   },
    //   rules: [
    //     { required: true, message: '请输入汽车品牌', trigger: 'change'},
    //   ]
    // },
    {
      label: '是否出场',
      prop: 'existOut',
      type: 'select',
      search: true,
      addDisplay: false,
      editDisplay: false,
      dataType:'string',
      value:'N',
      dicData: [
        {
          value:'Y',
          label:'已出场',
          
        },
        {
          value:'N',
          label:'未出场',
        }
      ]
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
      label: '备注',
      prop: 'reason',
      span: 24,
      type:'textarea',
      // rules: [
      //   { required: true, message: '请输入备注', trigger: 'blur'},
      // ]
    }
  ]
}
