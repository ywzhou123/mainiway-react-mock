import { prefix, ReqApi } from '../common/request';

export default {
    //认证
    auth: (pm = {}) => ReqApi.post({
        url: `${prefix}/api-token-auth/`,
        pm,
    }),
    //列表
    list: (pm = {}) => ReqApi.get({
        url: `${prefix}/snippets/`,
        pm,
    }),
    //详情
    detail: id => ReqApi.get({
        url: `${prefix}/snippets/${id}/`,
    }),
    //更新
    update: (pm = {}) => ReqApi.put({
        url: `${prefix}/snippets/${pm.id}/`,
        pm,
    }),
    create: (pm = {}) => ReqApi.post({
        url: `${prefix}/snippets/`,
        pm,
    }),
};