/**
 * Created by zuozhuo on 2017/1/26.
 */
'use strict'
// 这里除了使用XRouteUrl定义url外，不要有任何逻辑和其他脏代码，否则容易造成循环引用
import {XRouteUrl} from './utils/XRouteUrl'

export const urlPageIndex = new XRouteUrl('/');
export const urlPageUsers = new XRouteUrl('/users/:uid');
