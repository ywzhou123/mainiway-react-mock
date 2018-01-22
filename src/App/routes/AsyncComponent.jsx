import React from 'react';
import Loadable from 'react-loadable';

const Loading = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    } else {
        return null;
    }
};

const AsyncComponent = (loader) => Loadable({
    loader: loader,
    loading: Loading,
});

export default AsyncComponent;
