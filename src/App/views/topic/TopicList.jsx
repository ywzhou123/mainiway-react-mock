import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Input,Button} from 'antd';

@inject('store')
@observer
export default class TopicList extends Component {

    changeName = (event) =>{
        this.props.store.changeName(event.target.value)
    }
    onClick = () => {
        this.props.store.count += 1;
    }
    render() {
        return (
            <div>
                <Input onChange={this.changeName} style={{width:100}}/>
                <Button type="primary" onClick={this.onClick}>+</Button>
                <span>{this.props.store.msg}</span>
            </div>
        )
    }
}
