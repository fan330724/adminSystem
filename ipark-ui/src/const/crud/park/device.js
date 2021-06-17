import store from '@/store/index'
let userId = store.getters.userInfo.userId;

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
  menuWidth:300,
  column: [
    {
      label: '设备id',
      prop: 'id',
      hide: true,
      editDisabled: true,
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false
    },
    {
      label: '所属岗亭',
      prop: 'gateId',
      dataType:'string',
      type:'select',
      dicUrl: '/gate/gatesentrystatus/getGatesByParkId',
      search: true,
      props:{
        label:'name',
        value:'id'
      },
      rules: [
        { required: true, message: '请选择所属岗亭', trigger: 'change'},
      ]
    },
    {
      label: '设备名称',
      prop: 'cameraName',
      search: true,
      rules: [
        { required: true, message: '请输入设备名称', trigger: 'blur'}
      ]
    },
    {
      label: '设备账号',
      prop: 'cameraAccout',
      //search: true,
      viewDisplay:false,
      hide: true,
      rules: [
        { required: true, message: '请输入设备账号', trigger: 'blur'}
      ]
    },
    {
      label: '设备密码',
      prop: 'cameraPass',
      //search: true,
      type:'password',
      viewDisplay:false,
      hide: true,
      rules: [
        { required: true, message: '请输入设备密码', trigger: 'blur'}
      ]
    },
    {
      label: '设备品牌',
      prop: 'cameraType',
      type:'select',
      rules: [
        { required: true, message: '请选择设备类型', trigger: 'change'}
      ],
      dicData: [{
        label: '海康',
        value: 'H'
      }, {
        label: '立方',
        value: 'L'
      },
      {
        label: '科拓',
        value: 'K'
      },
      {
        label: '捷顺',
        value: 'J'
      },
      {
        label: '大华',
        value: 'D'
      }]
    },
    {
      label: '设备类型',
      prop: 'gateType',
      type:'select',
      dataType:'number',
      rules: [
        { required: true, message: '请选择设备类型', trigger: 'change'}
      ],
      value:1,
      dicData: [{
        label: '入口',
        value: 1
      }, {
        label: '出口',
        value: 2
      }]
    },
    {
      label: '摄像头IP',
      prop: 'cameraIp',
      rules: [
        { required: true, message: '请输入摄像头IP', trigger: 'blur'}
      ]
    },
    {
      label: '摄像头端口',
      prop: 'cameraPort',
      hide: true,
      rules: [
        { required: true, message: '请输入摄像头端口', trigger: 'blur'},
        {
          pattern: /^\d+$/,
          message: '端口号只能输入数字'
        },
        { min: 2, max: 5, message: '长度在 2 到 5 之间'},
        {validator:function(rule,value,callback){
          if( Number(value) > 65535){
            callback(new Error("端口号应小于65535"));
          }else{
            callback();
          }
        }, trigger: 'blur'}
      ] 
    },
    {
      label: '摄像头LED-IP',
      prop: 'cameraLedIp',
      hide: true,
      rules: [
        { required: true, message: '请输入摄像头LED-IP', trigger: 'blur'}
      ]
    },
    {
      label: '摄像头LED端口',
      prop: 'cameraLedPort',
      hide: true,
      rules: [
        { required: true, message: '请输入摄像头LED端口', trigger: 'blur'},
        {
          pattern: /^\d+$/,
          message: '端口号只能输入数字'
        },
        { min: 2, max: 5, message: '长度在 2 到 5 之间'},
        {validator:function(rule,value,callback){
          if( Number(value) > 65535){
            callback(new Error("端口号应小于65535"));
          }else{
            callback();
          }
        }, trigger: 'blur'}
      ]
    },
    {
      label: '是否验证设备账号',
      prop: 'verify',
      type:'select',
      editDisplay: false,
      addDisplay: false,
      rules: [
        { required: true, message: '请选择是否验证设备账号', trigger: 'change'}
      ],
      value:2,
      dicData: [{
        label: '已验证',
        value: 1
      }, {
        label: '未验证',
        value: 2
      }]
    }
  ]
}
