/**
 * 商品相关api
 */
import {
    http
  } from '@/api/service.js'
  
  /**
   * 查询列表
   * @param {Object} params - 查询参数  
   */
  export const getQuotes = (params) => {
    return http.get('/api/poem/quotes', {
      params
    })
  }

   /**
   * 查询诗列表
   * @param {Object} params - 查询参数  
   */
  export const getPoems = (params) => {
    return http.get('/api/poem/poems', {
      params
    })
  }

  /**
   * 查询菜单列表
   * @param {Object} params - 查询参数  
   */
  export const getMenus = (params) => {
    return http.get('/api/poem/menus', {
      params
    })
  }
  
  // 通用请求方法middleware 演示。文档：https://www.quanzhan.co/luch-request/guide/3.x/#middleware
  /**
   * 查询商品信息
   * @param {Object} data - 查询数据
   * @param {Object} params - 查询params参数
   */
  export const getGoodsInfo = (data, params) => {
    return http.middleware({
      method: 'POST', // 必须大写
      url: '/api/user/update',
      data: data,
      params: params,
      custom: {
        auth: true
      }
    })
  }
  