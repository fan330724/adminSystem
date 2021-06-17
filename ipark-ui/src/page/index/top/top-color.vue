<template>
  <el-color-picker
    :predefine="predefineColors"
    v-model="themeVal"
    size="mini"
    class="theme-picker"
    popper-class="theme-picker-dropdown"/>
</template>

<script>
import color from '@/mixins/color'
export default {
  name: 'TopColor',
  mixins: [color()],
  data() {
    return {
      chalk: '',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585'
      ]
    }
  }
}
</script>

<style>
.theme-picker{
  padding-top: 18px !important;
}
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
  width: 30px !important;
  height: 30px !important;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
