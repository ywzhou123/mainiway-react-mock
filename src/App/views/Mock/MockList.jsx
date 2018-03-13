import { Table } from 'antd';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { prefix } from '../../../Public/common/request';

@inject('mockStore')
@observer
export default class PurchaseComp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = props.mockStore;
        this.columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',
                width: '20%',
                render: (text, record, index) => <a onClick={() => { this.onEdit(record) }}>{text}</a>,
            }, {
                title: '地址',
                dataIndex: 'url',
                key: 'url',
                width: '40%',
                render: (text, record, index) => <a href={`${prefix}${text}?id=${record.id}`} target='_blank'>{text}</a>,
            }, {
                title: '创建人',
                dataIndex: 'owner',
                key: 'owner',
                width: '80px',
            }, {
                title: '创建时间',
                dataIndex: 'created',
                key: 'created',
                width: '100px',
            }];

    }
    componentDidMount() {
        this.onSearch();
    }
    componentWillUnmount() {
        this.store.clear();
    }
    onSearch = () => {
        this.store.fetchTableList();
    }
    onEdit = (record) => {
        // this.store.TabsStore.tabAdd({
        //     title: 'MOCK编辑',
        //     key: 'mockform'
        // });
        // mockFormStore.fetchDetail(record.id);
    }
    
    render() {
        return (
            <div style={{ paddingTop: 20 }}>
                <Table
                    {...this.store.Props}
                    rowKey='id'
                    columns={this.columns}
                />
            </div>
        );
    }
}