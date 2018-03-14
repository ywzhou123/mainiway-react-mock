import { observable, computed, action, runInAction } from 'mobx';
import Fetch from '../routes/fetch';


export default class MockStore {
    initDetail = {
        id: null,
        title: '',
        url: '',
        sleep: 0,
        code: '',
    };
    @observable detail = this.initDetail;
    @observable loading = false;
    @observable dataSource = [];
    @observable checked = true;
    @observable search = '';
    @observable paging = {
        total: 0,
        current: 1,
        pageSize: 20,
    };

    @action.bound fetchList(pm={}) {
        this.loading = true;
        pm.search = this.search;
        pm.page = this.paging.current;
        pm.pageSize = this.paging.pageSize;
        return Fetch.list(pm).then(json => {
            if (Array.isArray(json.results)) {
                this.dataSource = json.results;
                this.paging = Object.assign(this.paging, { total: json.count });
            }
            this.loading = false;
            return json;
        });
    }

    @action.bound fetchDetail(id){
        this.loading = true;
        return Fetch.detail(id).then(json => {
            if (json.id) {
                this.detail = Object.assign({}, this.detail, json);
            }
            this.loading = false;
            return json;
        })
    }
    @action.bound fetchSubmit() {
        this.loading = true;
        if (this.detail.id) {
            return Fetch.update(this.detail).then(json => {
                this.loading = false;
                return json;
            })
        } else {
            return Fetch.create(this.detail).then(json => {
                this.loading = false;
                return json;
            })
        }
    }
    @action clear() {
        this.detail = this.initDetail;
        this.loading = false;
    }
    @action.bound setDetail(detail) {
        if ('url' in detail) {
            detail.id=null
        };
        this.detail = Object.assign({}, this.detail, detail);
    }
}
