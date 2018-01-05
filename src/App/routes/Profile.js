import React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Profile extends React.Component {
    render() {
        return (
            <div>
                <h2>Profile</h2>
            </div>
        );
    }
}

module.exports = Profile;
