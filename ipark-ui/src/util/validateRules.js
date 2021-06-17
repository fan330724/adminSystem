/**
 * @desc  [自定义校验规则]
 * @example
 *  import { validateRule } from "@/utils/validateRules";
 *  rules: [
 *     { validator: validateRule.emailValue, trigger: 'blur'}
 *  ]
 */

export const rule = {
  /**
   * 校验 请输入中文、英文、数字包括下划线
   * 名称校验
   */
  validatorNameCn(rule, value, callback) {
    let acount = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
    if (value && (!(acount).test(value))) {
      callback(new Error('请输入中文、英文、数字包括下划线'))
    } else {
      callback()
    }
  },
  /**
   * 校验 请输入中文、英文、数字包括下划线
   * 名称校验
   */
  validatorKey(rule, value, callback) {
    let acount = /^[A-Z_]+$/
    if (value && (!(acount).test(value))) {
      callback(new Error('请输入大写英文、下划线'))
    } else {
      callback()
    }
  },

  /**
   * 校验首尾空白字符的正则表达式
   *
   */
  checkSpace(rule, value, callback) {
    let longrg = /[^\s]+$/;
    if(!longrg.test(value)){
      callback(new Error('请输入非空格信息'));
    } else {
      callback();
    }
  },
    /**
   * 校验 手机号
   * 手机号校验
   */
  validatorPhone(rule, value, callback) {
    let acount = /^1[0-9]{10}$/
    if (value && (!(acount).test(value))) {
      callback(new Error('请正确输入手机号'))
    } else {
      callback()
    }
  },
  /**
   * 
   *校验车牌号
   */
  validPlatNumber(rule,value,callback){
    let reg= /^((([\u4E00-\u9FA5]|[A-Z]){1}[A-Z]{1}[A-Z0-9]{5,6})$)|(([\u4E00-\u9FA5]|[A-Z]){1}[A-Z]{1}[A-Z0-9]{4}[挂学警港澳]{1})$/;
    if(!reg.test(value)){
      callback(new Error('请正确输入车牌号'))
    }else{
      callback()
    }
  }
}
