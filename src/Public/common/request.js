import React from 'react';
import { message } from 'antd';
import { JSON2Str } from './utils';
const prefix = 'http://localhost:8001';

const jsonHead = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

const getCookie = (name) => {
    var arr, reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if (arr == document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};

const setJsonHead = (name) => {
    let val = getCookie(name);
    if (!val) {
        return;
    }else{
        jsonHead[name] = val || "";
    }
};

const delJsonHead = (name) => {
    delete jsonHead[name];
    delCookie(name);
};

const setCookie = (name, val) => {
    var exp = new Date();
    exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期  
    document.cookie = `${name}=${val};expires=${exp.toGMTString()};path=/`;
    setJsonHead(name);
};

const delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
    }
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

const postForm = (pm) => ({
    method: "POST",
    mode: "no-cors",
    credentials: "same-origin",
    headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    // body: pm,
    body: 'image=&look_back=24&look_forward=12&data_set=%5B%5B113.0%5D%5d',
});

const get = () => ({
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead),
    method: 'GET',
});

const handlerReq = (req) => {
    return req.then((resp) => {
        // console.log('resp:', resp.status);
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
    postForm(pm) {
        return handlerReq(fetch(pm.url, postForm(pm.pm)));
    },
    put(pm) {
        return handlerReq(fetch(pm.url, put(pm.pm)));
    },
};


export { prefix, ReqApi, setCookie, setJsonHead, delJsonHead };