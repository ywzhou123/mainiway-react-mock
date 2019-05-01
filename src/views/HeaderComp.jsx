import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Input, Icon, Form, Avatar, message } from 'antd';
import './HeaderComp.scss'
import LogoImg from '../asserts/img/Mockplus.png'

@inject('mockStore')
@observer
class HeaderComp extends Component {
    constructor(props, context) {
        super(props, context);
        
    }
    
    componentWillMount() {
        const token = window.localStorage.getItem('token')
        if (token) {
            this.props.mockStore.fetchUserInfo(token)
        }
    }
    componentDidMount() {
        this.props.form.validateFields();
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        const { form: { validateFields }, mockStore: { fetchLogin }} = this.props;
        validateFields((err, values) => {
            if (!err) {
                fetchLogin(values).then(json => {
                    if (json.token) {
                        message.success("登录成功！");
                    } else {
                        message.error(Object.values(json));
                    }
                });
            }
        });
    }
    handleLogout = () => {
        const { mockStore } = this.props;
        mockStore.clear()
    }
    hasErrors = (fieldsError) => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    render() {
        const { form: { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched }} = this.props;
        const { mockStore: { userInfo: { first_name, last_name, username }}} = this.props
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const name = first_name || last_name ? first_name + last_name : (username ? username : '')
        return (
            <div className='header'>
                <div className='logo-wrap'>
                    <img src={LogoImg} style={{display: 'none'}}/>
                    <img src={require('../asserts/img/Mockplus.png')} alt="Mock"/>
                    <span>Mock Server Api</span>
                </div>
                {
                    name ? 
                    <div className='welcome'>
                        <span className='text'>欢迎：{name}</span>
                        <Button type="ghost" onClick={this.handleLogout}>退出</Button>
                    </div>
                    :
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={this.hasErrors(getFieldsError())}
                    >
                        登录
                    </Button>
                    </Form.Item>
                </Form>
                }
            </div>
        )
    }
}

export default Form.create()(HeaderComp);
