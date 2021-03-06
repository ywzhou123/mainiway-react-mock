import React from 'react';
import { message } from 'antd';
import { JSON2Str } from './utils';
import { prefix } from '../config';
import RootStore from '../stores/index';

const jsonHead = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

const put = (pm) => ({
    method: "PUT",
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead, pm.header),
    body: JSON.stringify(pm.pm),
});

const post = (pm) => ({
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead, pm.header),
    body: JSON.stringify(pm.pm),
});

const get = (pm) => ({
    method: 'GET',
    mode: "cors",
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead, pm.header),
});

const handlerReq = (req) => {
    return req.then((resp) => {
        return resp.json();
    });
};

const ReqApi = {
    get(pm) {
        const { mockStore: { token }} = RootStore
        if (token && !pm.noToken) pm.header = { Authorization: 'Token ' + token }
        pm.url = `${pm.url}?${JSON2Str(pm.pm)}`;
        return handlerReq(fetch(pm.url, get(pm)));
    },
    post(pm) {
        const { mockStore: { token }} = RootStore
        console.log(pm)
        if (token && !pm.noToken) pm.header = { Authorization: 'Token ' + token }
        return handlerReq(fetch(pm.url, post(pm)));
    },
    put(pm) {
        const { mockStore: { token }} = RootStore
        if (token && !pm.noToken) pm.header = { Authorization: 'Token ' + token }
        return handlerReq(fetch(pm.url, put(pm)));
    },
};


export { prefix, ReqApi };