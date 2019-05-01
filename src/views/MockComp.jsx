import { Button, Input, InputNumber, Form, Row, Col, Spin, message, Divider, Pagination, Tooltip, Switch } from 'antd';
import React, { Component } from 'react';
import HeaderComp from './HeaderComp'
import JsonEditorComp from './JsonEditor';
import { observer, inject } from 'mobx-react';
import { prefix } from '../common/request';
import RootStore from '../stores/index';
const FormItem = Form.Item;
const Search = Input.Search;
import './MockComp.scss'

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
                            message.success("保存成功！");
                        } else {
                            message.error(Object.values(json));
                        }
                    });
                }
            });
        } else {
            message.error("Json代码有误，请检查！");
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
            <div className='container'>
                <Spin spinning={loading}>
                    <HeaderComp />
                    <Form>
                        <Row>
                            <Col span={16}>
                                <Row>
                                    <Col span={12}>
                                        <FormItem
                                            label="URL" {...formItemLayout}
                                        >
                                            {getFieldDecorator('url', {
                                                initialValue: detail.url,
                                                rules: [{ required: true, message: '请输入接口地址，以/开头~' }],
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
                                                rules: [{ required: true, message: '请输入接口说明~' }],
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
                                    <Col span={2} className='tooltip-wrap'>
                                        <a href='http://mockjs.com/examples.html' target='_blank'>文档</a>
                                        <Divider className='divider'/>
                                        <Tooltip placement="right" title='@natural()'>自然数</Tooltip>
                                        <Tooltip placement="right" title='@integer()'>整数</Tooltip>
                                        <Tooltip placement="right" title='@@float()'>浮点数</Tooltip>
                                        <Tooltip placement="right" title='@increment()'>递增</Tooltip>
                                        <Tooltip placement="right" title='@id()'>ID</Tooltip>
                                        <Tooltip placement="right" title='@range(10)'>范围</Tooltip>
                                        <Divider/>
                                        <Tooltip placement="right" title='@string(5)'>字符串</Tooltip>
                                        <Tooltip placement="right" title='@name()'>英文名</Tooltip>
                                        <Tooltip placement="right" title='@cword(3)'>汉字</Tooltip>
                                        <Tooltip placement="right" title='@ctitle(5)'>短标题</Tooltip>
                                        <Tooltip placement="right" title='@csentence(8)'>句子</Tooltip>
                                        <Tooltip placement="right" title='@cparagraph()'>段落</Tooltip>
                                        <Divider/>
                                        <Tooltip placement="right" title='@boolean()'>布尔值</Tooltip>
                                        <Tooltip placement="right" title='@color()'>颜色</Tooltip>
                                        <Divider/>
                                        <Tooltip placement="right" title='@time("HH:mm:ss")'>时间</Tooltip>
                                        <Tooltip placement="right" title='@datetime("yyyy-MM-dd HH:mm:ss")'>日期</Tooltip>
                                        <Divider/>
                                        <Tooltip placement="right" title='@province()'>省份</Tooltip>
                                        <Tooltip placement="right" title='@city()'>城市</Tooltip>
                                        <Tooltip placement="right" title='@county()'>城市</Tooltip>
                                        <Divider/>
                                        <Tooltip placement="right" title='@cfirst()'>姓</Tooltip>
                                        <Tooltip placement="right" title='@clast()'>名</Tooltip>
                                        <Tooltip placement="right" title='@cname()'>姓名</Tooltip>
                                    </Col>
                                    <Col span={20} >
                                        <JsonEditorComp value={detail.code} loading={loading} ref={ref => this.jsonEditor = ref} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={7}>
                                <Row type="flex" align='middle'>
                                    <Col span={18}>
                                        <Search
                                            placeholder="按标题或URL模糊搜索！"
                                            onSearch={this.onSearch}
                                            enterButton
                                        />
                                    </Col>
                                    <Col span={4} offset={2}>
                                        <Switch checkedChildren="URL" unCheckedChildren="标题" checked={checked} onChange={this.onCheckChange} />                            
                                    </Col> 
                                </Row>
                                
                                <Divider />
                                <Pagination showSizeChanger hideOnSinglePage size='small' onChange={this.onPageChange} onShowSizeChange={this.onShowSizeChange} {...paging} style={{textAlign:'right'}}/>
                                {
                                    dataSource.slice().map(item => <div className={`data-item-wrap ${item.id == detail.id? 'selected':''}`} key={item.id}>
                                        <Button type='primary' size='small' onClick={() => this.onEdit(item.id)}>编辑</Button>
                                        <Tooltip title={checked?item.title:item.url}><a href={`${prefix}${item.url}`} target='_blank'>{checked?item.url:item.title}</a></Tooltip>
                                    </div>
                                    )
                                }
                                <Pagination showSizeChanger hideOnSinglePage size='small' onChange={this.onPageChange} onShowSizeChange={this.onShowSizeChange} {...paging} style={{textAlign:'right'}}/>                            
                            </Col>
                        </Row>  
                    </Form>
                </Spin>
            </div>
        )
    }
}
const options = {
    onValuesChange(props, values) {
        RootStore.mockStore.setDetail(values);
    },
};
export default Form.create(options)(MockComp);