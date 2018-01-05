import Loadable from 'react-loadable';

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
export const getNavData = app => [
    {
        component: dynamicWrapper('../layouts/BasicLayout'),
        layout: 'BasicLayout',
        name: '首页', // for breadcrumb
        path: '/',
        children: [
            {
                name: 'Dashboard',
                icon: 'dashboard',
                path: 'dashboard',
            },
        ]
    },
    // {
    //     component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    //     path: '/user',
    //     layout: 'UserLayout',
    //     children: [
    //         {
    //             name: '帐户',
    //             icon: 'user',
    //             path: 'user',
    //             children: [
    //                 {
    //                     name: '登录',
    //                     path: 'login',
    //                     component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    //                 },
    //             ],
    //         },
    //     ],
    // },
]