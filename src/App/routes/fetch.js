import { prefix, ReqApi } from '../../Public/common/request';

export default {
    //认证
    auth: (pm = {}) => ReqApi.post({
        url: `${prefix}/api-token-auth/`,
        pm,
    }),
    //列表、详情
    list: (pm = {}) => ReqApi.get({
        url: `${prefix}/snippets/`,
        pm,
    }),
    //更新
    update: (pm = {}) => ReqApi.put({
        url: `${prefix}/snippets/${pm.id}/`,
        pm,
    }),
};