import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import { Icon } from 'antd';
// import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';

const links = [{
    title: '帮助',
    href: '',
}, {
    title: '隐私',
    href: '',
}, {
    title: '条款',
    href: '',
}];

const copyright = <div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>;

class UserLayout extends React.Component {
    static childContextTypes = {
        location: PropTypes.object,
    }
    // getChildContext() {
    //     const { location } = this.props;
    //     return { location };
    // }
    // getPageTitle() {
    //     const { getRouteData, location } = this.props;
    //     const { pathname } = location;
    //     let title = 'Ant Design Pro';
    //     getRouteData('UserLayout').forEach((item) => {
    //         if (item.path === pathname) {
    //             title = `${item.name} - Ant Design Pro`;
    //         }
    //     });
    //     return title;
    // }
    render() {
        // const { getRouteData } = this.props;

        return (
            <div >
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.header}>
                            <Link to="/">
                                <img alt="" className={styles.logo} src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
                                <span className={styles.title}>Ant Design</span>
                            </Link>
                        </div>
                        <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
                    </div>
                    {
                        // getRouteData('UserLayout').map(item =>
                        //     (
                        //         <Route
                        //             exact={item.exact}
                        //             key={item.path}
                        //             path={item.path}
                        //             component={item.component}
                        //         />
                        //     )
                        // )
                    }
                    <Switch>
                        <Route path="user" component={() => <div>user</div>} />
                        <Route path="login" component={() => <div>login</div>} />
                        <Route path="register" component={() => <div>register</div>} />
                        <Route path="register-result" component={() => <div>register-result</div>} />
                    </Switch>
                    {/* <GlobalFooter className={styles.footer} links={links} copyright={copyright} /> */}
                </div>
            </div>
        );
    }
}

export default UserLayout;