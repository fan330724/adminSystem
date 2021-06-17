import { getDetails } from '@/api/admin/user'


var validateUsername = (rule, value, callback) => {
  getDetails(value).then(response => {
    if (window.boxType === 'edit') callback()
    const result = response.data.data
    if (result !== null) {
      callback(new Error('用户名已经存在'))
    } else {
      callback()
    }
  })
}

let validUsernameStyle=(rule,value,callback)=>{
  let reg= /^(?![0-9]+$)[0-9A-Za-z]{4,20}$/
  if(!reg.test(value)){callback(new Error('用户名必须是由4-20位纯字母或者字母+数字组合'))
  }else{
    callback()
  }
};
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  align: 'center',
  addBtn: false,
  column: [{
    fixed: true,
    label: 'id',
    prop: 'userId',
    span: 24,
    hide: true,
    editDisabled: true,
    addDisplay: false,
    editDisplay: false,
    viewDisplay: false
  }, {
    fixed: true,
    label: '用户名',
    prop: 'username',
    editDisabled: true,
    slot: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入用户名'
    },
    { validator: validUsernameStyle, trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' }
    ]
  }, {
    label: '密码',
    prop: 'password',
    type: 'password',
    value: '',
    hide: true,
    span: 24,
    rules: [{
      min: 6,
      max: 20,
      message: '长度在 6 到 20 个字符',
      trigger: 'blur'
    }]
  },
  {
    label: '姓名',
    prop: 'nickname',
    span: 24,
    // hide: true,
    rules: [{
      required: true,
      message: '请输入姓名'
    },
    ]
  },
  // {
  //   label: '所属部门',
  //   prop: 'deptId',
  //   formslot: true,
  //   slot: true,
  //   span: 24,
  //   hide: true,
  //   dataType: "number",
  //   rules: [{
  //     required: true,
  //     message: '请选择部门',
  //     trigger: 'change'
  //   }]
  // }, 
  {
    label: '手机号',
    prop: 'phone',
    value: '',
    span: 24,
    rules: [{
      min: 11,
      max: 11,
      message: '长度在 11 个字符',
      trigger: 'blur'
    }]
  }, {
    label: '角色',
    prop: 'role',
    formslot: true,
    slot: true,
    overHidden: true,
    span: 24,
    // search: true,
    rules: [{
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }]
  }, {
    label: '状态',
    prop: 'lockFlag',
    type: 'radio',
    slot: true,
    border: true,
    span: 24,
    rules: [{
      required: true,
      message: '请选择状态',
      trigger: 'blur'
    }],
    dicData: [{
      label: '有效',
      value: '0'
    }, {
      label: '锁定',
      value: '9'
    }]
  }, {
    width: 180,
    label: '创建时间',
    prop: 'createTime',
    type: 'datetime',
    format: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm:ss',
    editDisabled: true,
    addDisplay: false,
    span: 24
  }]
}
