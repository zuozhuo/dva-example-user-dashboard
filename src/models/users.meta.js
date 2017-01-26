/**
 * Created by zuozhuo on 2017/1/26.
 */
'use strict'
import $$ from '../utils/appHelper'

// 申明model的命名空间
export const NAMESPACE = "users";

// 声明model的所有ACTION类型
export const ACTION_TYPES = $$.createActionTypes({
  save: '',
  fetch: '',
  remove: '',
  patch: '',
  create: '',
  reload: '',
});


// 创建model的操作action快捷方法
export const {
  createAction,
  dispatchAction,
  putAction
} = $$.createModelActionMethods(NAMESPACE);
