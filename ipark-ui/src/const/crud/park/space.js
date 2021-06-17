
import store from '@/store/index'
let userId = store.getters.userInfo.userId;
userId = String(userId || '')
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
  labelWidth:110,
  searchGutter:30,
  dialogWidth:'55%',
  menuWidth:200,
  searchLabelWidth:100,
  searchSpan:5,
  searchSize:'mini',
  column: [
    {
      label: '车位id',
      prop: 'id',
      editDisabled: true,
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false,
      hide:true
    },
    {
      label: '车位编号',
      prop: 'num',
      search:true,
      rules: [
        { required: true, message: '请输入车位编号', trigger: 'blur'},
      ]
    },
    {
      label: '车位锁编号',
      prop: 'spotLockId',
      // editDisplay: true,
      // editDisabled: true,
      addDisplay: true,
      viewDisplay:true,
      search:true,
    },
    {
      label: '是否带充电桩',
      prop: 'chargingpileStatus',
      type: 'select',
      dataType:'number',
      search:true,
      rules: [{
        required: true,
        message: '是否带充电桩',
        trigger: 'change'
      }],
      dicData: [{
        label: '有',
        value: 1
      }, {
        label: '没有',
        value: 0
      }
    ]
    },
    {
      label: '启用状态',
      prop: 'status',
      type: 'select',
      search:true,
      rules: [{
        required: true,
        message: '请选择启用状态',
        trigger: 'change'
      }],
      dicData: [{
        label: '可用',
        value: 'Y'
      }, {
        label: '有停车',
        value: 'N'
      }, {
        label: '禁用',
        value: '0'
      }
    ]
    },
    {
      label: '所在区域',
      prop: 'area',
      rules: [
        { required: true, message: '请填写所在区域', trigger: 'blur'},
      ]
    },
    {
      label: '层级',
      prop: 'level',
      type: 'select',
      search:true,
      rules: [{
        required: true,
        message: '请选择层级',
        trigger: 'change'
      }],
      dicData: [
        {
        label: '地上',
        value: '0'
      }, {
        label: '负一',
        value: '1'
      },
      {
        label: '负二',
        value: '2'
      },
      {
        label: '负三',
        value: '3'
      }]
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
      label: '添加时间',
      prop: 'createDate',
      type: 'date',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      addDisplay: false,
      editDisplay: false
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
    {
      label: '删除人',
      prop: 'deleteBy',
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false,
      hide:true
    },
    {
      label: '删除时间',
      prop: 'deleteDate',
      type: 'datetime',
      format: 'yyyy-MM-dd hh:mm',
      valueFormat: 'yyyy-MM-dd hh:mm',
      addDisplay: false,
      editDisplay: false,
      viewDisplay:false,
      hide:true
    }
  ]
}
