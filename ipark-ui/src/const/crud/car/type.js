
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
      label: '类型名称',
      prop: 'name',
      rules: [
        { required: true, message: '请输入类型名称', trigger: 'blur'},
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
      ],
      search: true
    },
    {
      label: '备注',
      prop: 'remark'
    }
  ]
}
