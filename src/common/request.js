import React from 'react';
import { message } from 'antd';
import { JSON2Str } from './utils';
const prefix = 'http://localhost:8001';

const jsonHead = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

const put = (pm) => ({
    method: "PUT",
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead),
    body: JSON.stringify(pm),
});

const post = (pm) => ({
    method: "POST",
    // mode: "cors",
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead),
    body: JSON.stringify(pm),
});

const get = () => ({
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead),
    method: 'GET',
});

const handlerReq = (req) => {
    return req.then((resp) => {
        return resp.json();
    });
};

const ReqApi = {
    get(pm) {
        pm.url = `${pm.url}?${JSON2Str(pm.pm)}`;
        return handlerReq(fetch(pm.url, get()));
    },
    post(pm) {
        return handlerReq(fetch(pm.url, post(pm.pm)));
    },
    put(pm) {
        return handlerReq(fetch(pm.url, put(pm.pm)));
    },
};


export { prefix, ReqApi };