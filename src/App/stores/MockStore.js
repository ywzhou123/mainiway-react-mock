import { observable, computed, action, runInAction } from 'mobx';
import Fetch from '../routes/fetch';
import BaseTableStore from '../../Public/components/BaseTable/BaseTableStore';

export default class MockStore extends BaseTableStore{
    @action fetchTableList() {
        this.loading = true;
        const { page } = this.pages;
        
        Fetch.list({ page }).then(json => {
            this.dataSource = json.results || [];
            this.paging = Object.assign(this.paging, { total: json.count, current: page });
            this.loading = false;
        });
    }
}
