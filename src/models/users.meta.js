/**
 * Created by zuozhuo on 2017/1/26.
 */
'use strict'
import $$ from '../utils/appHelper'

export const NAMESPACE = "users";

export const ACTION_TYPES = {
  save: 'save',
  fetch: 'fetch',
  remove: 'remove',
  patch: 'patch',
  create: 'create',
  reload: 'reload',
};


export const {
  createAction,
  dispatchAction,
  putAction
} = $$.createModelActionMethods(NAMESPACE);
