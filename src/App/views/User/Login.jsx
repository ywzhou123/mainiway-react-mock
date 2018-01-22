import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert, Spin } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import styles from './Login.less';
import queryString from 'queryString';
const FormItem = Form.Item;
const { TabPane } = Tabs;


@inject("userStore")
@observer
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            count: 0,
            type: 'account',
        };
    }
    
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onSwitch = (key) => {
        this.setState({
            type: key,
        });
    }

    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { type } = this.state;
        const { form: { validateFields }, userStore } = this.props;
        validateFields({ force: true },
            (err, data) => {
                if (!err) {
                    userStore.fetchLogin(data);
                }
            }
        );
    }

    renderMessage = (message) => {
        return (
            <Alert
                style={{ marginBottom: 24 }}
                message={message}
                type="error"
                showIcon
            />
        );
    }
    getFrom = () => {
        const query = queryString.parse(this.props.search);
        return query.from || '/user/info';
    }
    render() {
        const { form, login, userStore } = this.props;
        const { getFieldDecorator } = form;
        const { count, type } = this.state;
        const { isLogin, loading } = userStore;
        const from = this.getFrom();

        if (isLogin) {
            return <Redirect to={from} />
        }
        return (
            <div className={styles.main}>
                <Spin spinning={loading}>
                    <Form onSubmit={this.handleSubmit}>
                        <Tabs animated={false} className={styles.tabs} activeKey={type} onChange={this.onSwitch}>
                            <TabPane tab="账户密码登录" key="account">
                                {
                                    login.status === 'error' &&
                                    login.type === 'account' &&
                                    login.submitting === false &&
                                    this.renderMessage('账户或密码错误')
                                }
                                <FormItem>
                                    {getFieldDecorator('username', {
                                        initialValue: "admin",
                                        rules: [{
                                            required: type === 'account', message: '请输入账户名！',
                                        }],
                                    })(
                                        <Input
                                            size="large"
                                            prefix={<Icon type="user" className={styles.prefixIcon} />}
                                            placeholder="请输入账户名！"
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        initialValue: "Ywzhou@123",
                                        rules: [{
                                            required: type === 'account', message: '请输入密码！',
                                        }],
                                    })(
                                        <Input
                                            size="large"
                                            prefix={<Icon type="lock" className={styles.prefixIcon} />}
                                            type="password"
                                            placeholder="请输入密码！"
                                        />
                                    )}
                                </FormItem>
                            </TabPane>
                            <TabPane tab="手机号登录" key="mobile">
                                {
                                    login.status === 'error' &&
                                    login.type === 'mobile' &&
                                    login.submitting === false &&
                                    this.renderMessage('验证码错误')
                                }
                                <FormItem>
                                    {getFieldDecorator('mobile', {
                                        rules: [{
                                            required: type === 'mobile', message: '请输入手机号！',
                                        }, {
                                            pattern: /^1\d{10}$/, message: '手机号格式错误！',
                                        }],
                                    })(
                                        <Input
                                            size="large"
                                            prefix={<Icon type="mobile" className={styles.prefixIcon} />}
                                            placeholder="手机号"
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Row gutter={8}>
                                        <Col span={16}>
                                            {getFieldDecorator('captcha', {
                                                rules: [{
                                                    required: type === 'mobile', message: '请输入验证码！',
                                                }],
                                            })(
                                                <Input
                                                    size="large"
                                                    prefix={<Icon type="mail" className={styles.prefixIcon} />}
                                                    placeholder="验证码"
                                                />
                                            )}
                                        </Col>
                                        <Col span={8}>
                                            <Button
                                                disabled={count}
                                                className={styles.getCaptcha}
                                                size="large"
                                                onClick={this.onGetCaptcha}
                                            >
                                                {count ? `${count} s` : '获取验证码'}
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </TabPane>
                        </Tabs>
                        <FormItem className={styles.additional}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox className={styles.autoLogin}>自动登录</Checkbox>
                            )}
                            <a className={styles.forgot} href="">忘记密码</a>
                            <Button size="large" loading={login.submitting} className={styles.submit} type="primary" htmlType="submit">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                    <div className={styles.other}>
                        其他登录方式
                        {/* 需要加到 Icon 中 */}
                        <span className={styles.iconAlipay} />
                        <span className={styles.iconTaobao} />
                        <span className={styles.iconWeibo} />
                        <Link className={styles.register} to="/user/register">注册账户</Link>
                    </div>
                </Spin>
            </div>
        );
    }
}
Login.defaultProps = {
    login: {
        submitting: false,
        status: "success",
        type: "account",
    },
};
export default Form.create()(Login);
