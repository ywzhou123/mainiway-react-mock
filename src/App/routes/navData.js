import AsyncComponent from './AsyncComponent';
import AsyncRoute from './AsyncRoute';
// wrapper of dynamic
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
const dynamicWrapper = (component) => Loadable({
    loader: () => import(`${component}`),
    loading: MyLoadingComponent
});

// nav data
export const getNavData = () => [
    {
        title: '首页',
        path: '/',
        layout: 'BasicLayout',
        children: [
            {
                key: 'home',
                title: 'home',
                icon: 'home',
                path: ' ',
                component: () => <div>welcome</div>,
            },
            {
                key: 'mock',
                title: 'Mock',
                icon: 'table',
                children: [
                    {
                        title: 'MockList',
                        path: 'mocklist',
                        component: AsyncComponent(() => import('../views/Mock/MockList')),
                    },
                    {
                        title: 'Calendar',
                        icon: 'calendar',
                        path: 'calendar',
                        component: AsyncComponent(() => import('../views/Calendar')),

                    },
                    {
                        title: 'Grades',
                        icon: 'grades',
                        path: 'grades',
                        component: AsyncComponent(() => import('../views/Grades')),
                    },
                    {
                        title: 'Messages',
                        icon: 'messages',
                        path: 'messages',
                        component: AsyncComponent(() => import('../views/Messages')),

                    },
                    {
                        title: 'Profile',
                        icon: 'profile',
                        path: 'profile',
                        component: AsyncComponent(() => import('../views/Profile')),
                    },
                ]
            },
        ]
    },
    {
        path: '/user',
        layout: 'UserLayout',
        children: [
            {
                name: '帐户',
                icon: 'user',
                path: 'user',
                children: [
                    {
                        name: '登录',
                        path: 'login',
                        component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
                    },
                ],
            },
        ],
    },
]