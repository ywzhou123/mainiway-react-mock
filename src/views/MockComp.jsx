import { Button, Input, InputNumber, Form, Row, Col, Spin, message, Divider, Pagination, Tooltip, Switch } from 'antd';
import React, { Component } from 'react';
import JsonEditorComp from './JsonEditor';
import { observer, inject } from 'mobx-react';
import { prefix } from '../common/request';
import RootStore from '../stores/index';
const FormItem = Form.Item;
const Search = Input.Search;

@inject('mockStore')
@observer
class MockComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.type = "edit";
    }
    
    componentWillMount() {
        this.props.mockStore.fetchList()
    }
    
    componentWillReact() {
        if (this.props.mockStore.loading) {
            this.props.form.resetFields();
        }
    }
    componentWillUnmount() {
        this.props.mockStore.clear();
    }
    onEdit = (id) => {
        const { mockStore: { fetchDetail } } = this.props;
        fetchDetail(id);
    }
    onSearch = (value) => {
        const { mockStore } = this.props;
        mockStore.search = value;
        mockStore.fetchList(); 
    }
    onPageChange = (current, pageSize) => {
        const { mockStore } = this.props;
        mockStore.paging = { ...mockStore.paging, current, pageSize };
        mockStore.fetchList();
    }
    onShowSizeChange = (current, pageSize) => {
        const { mockStore } = this.props;
        mockStore.paging = { ...mockStore.paging, current, pageSize };
        mockStore.fetchList();
    }
    onCheckChange = () => {
        const { mockStore } = this.props;
        mockStore.checked = !mockStore.checked;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { form: { validateFields }, mockStore: { setDetail, fetchSubmit }} = this.props;
        const code = this.jsonEditor.getJson();
        if (code) {
            validateFields((err, values) => {
                if (!err) {
                    setDetail({ code });
                    fetchSubmit().then(json => {
                        if (json.id) {
                            message.success("保存成功！")
                        } else {
                            message.error(Object.values(json))
                        }
                    });
                }
            });
        } else {
            message.error("Json代码有误，请检查！")
        } 
    }
    render() {
        const { form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched },
            mockStore: { dataSource, detail, loading, paging, checked, jsondata },
        } = this.props;
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 17 },
        };
        return (
            <Spin spinning={loading}>
                <Form style={{ paddingTop: 20 }}>
                    <Row>
                        <Col span={16}>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="URL" {...formItemLayout}
                                    >
                                        {getFieldDecorator('url', {
                                            initialValue: detail.url,
                                            rules: [{ required: true, message: 'Please input your url!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <FormItem
                                        label="标题" {...formItemLayout}
                                    >
                                        {getFieldDecorator('title', {
                                            initialValue: detail.title,
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6}>
                                    <FormItem
                                        label="延迟" {...formItemLayout}
                                    >
                                        {getFieldDecorator('sleep', {
                                            initialValue: detail.sleep,
                                        })(
                                            <InputNumber
                                                min={0}
                                                max={30}
                                                formatter={value => `${value}秒`}
                                                parser={value => value.replace('秒', '')}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={4} style={{ textAlign: 'right' }}>
                                    <Button type="primary" onClick={this.handleSubmit} size="large">提交</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <a href='http://mockjs.com' target='_blank'>官方文档</a>
                                    <a href={prefix} target='_blank'>后端地址</a>
                                    <Tooltip placement="right" title='"buyerTelNo": "@natural",'>自然数</Tooltip>
                                    <Tooltip placement="right" title='"classId|1": "@id()",'>数字串</Tooltip>
                                    <Tooltip placement="right" title='"companyCode|1": "@increment",'>从1开始</Tooltip>
                                    <Tooltip placement="right" title='"className": "@cword(3)",'>汉字</Tooltip>
                                    <Tooltip placement="right" title='"remarks": "@name()",'>英文名</Tooltip>
                                    <Tooltip placement="right" title='"goodsName": "@ctitle",'>短标题</Tooltip>
                                    <Tooltip placement="right" title='"companyName": "@csentence(8)",'>句子</Tooltip>
                                    <Tooltip placement="right" title='"company|+1": [1,2,3]'>随机项</Tooltip>
                                    <Tooltip placement="right" title='"list|30": [{}]'>列表</Tooltip>
                                </Col>
                                <Col span={20} >
                                    {/* <FormItem
                                        // {...formItemLayout}
                                    >
                                        {getFieldDecorator('code', {
                                            initialValue: detail.code,
                                        })(
                                            <JsonEditorComp ref={ref => this.jsonEditor = ref} />
                                        )}
                                    </FormItem> */}
                                    <JsonEditorComp value={detail.code} loading={loading} ref={ref => this.jsonEditor = ref} />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={7}>
                            <Row type="flex" align='middle'>
                                <Col span={4}>
                                    <Switch checkedChildren="URL" unCheckedChildren="TITLE" checked={checked} onChange={this.onCheckChange} />                            
                                </Col>
                                <Col span={20}>
                                    <Search
                                        placeholder="按标题和URL地址进行模糊搜索！"
                                        onSearch={this.onSearch}
                                        enterButton
                                    />
                                </Col>   
                            </Row>
                            
                            <Divider />
                            <Pagination showSizeChanger hideOnSinglePage size='small' onChange={this.onPageChange} onShowSizeChange={this.onShowSizeChange} {...paging} style={{textAlign:'right'}}/>
                            {
                                dataSource.slice().map(item => <div key={item.id} style={{ padding: '4px 0', background: item.id == detail.id ? 'greenyellow':'none'}}>
                                        <Button type='primary' size='small' onClick={() => this.onEdit(item.id)} style={{ marginRight:10 }}>编辑</Button>
                                        <Tooltip title={checked?item.title:item.url}><a href={`${prefix}${item.url}`} target='_blank'>{checked?item.url:item.title}</a></Tooltip>
                                    </div>
                                )
                            }
                            <Pagination showSizeChanger hideOnSinglePage size='small' onChange={this.onPageChange} onShowSizeChange={this.onShowSizeChange} {...paging} style={{textAlign:'right'}}/>                            
                        </Col>
                    </Row>  
                </Form>
            </Spin>
        )
    }
}
const options = {
    onValuesChange(props, values) {
        RootStore.mockStore.setDetail(values)
    }
}
export default Form.create(options)(MockComp);