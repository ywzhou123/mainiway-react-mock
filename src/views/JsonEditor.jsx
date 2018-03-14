//https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import JSONEditor from 'jsoneditor';

@observer
export default class JsonEditor extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value || "{}",
            id: props.id || ("jsoneditor-" + Math.random()),
        };
    }
    setData = () => {
        try {
            let data = JSON.parse(this.state.value);
            this.editor.set(data);
        } catch (error) {}
    }
    componentDidMount() {
        const container = document.getElementById(this.state.id);
        let options = {
            mode: 'code',
            onChange: this.onChange,
            // modes: ['code', 'form', 'text', 'tree', 'view'],
            // onModeChange: function (newMode, oldMode) { },
            // onError:function(error){console.log('onEr')},
            ...this.props.options,
        };
        this.editor = new JSONEditor(container, options);
        this.setData();

    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && 'loading' in nextProps && nextProps.loading==true) {
            this.setState(
                { value: nextProps.value },
                this.setData,
            );
        }
    }
    onChange = () => {
        try {
            let json = this.editor.get();
            let value = JSON.stringify(json);
        } catch (error) {}
    }
    getJson = () => {
        try {
            let json = this.editor.get();
            let value = JSON.stringify(json);
            return value;
        } catch (error) { 
            return null;
        }
    }
    render() {
        let { style, loading, ...props } = this.props;
        let { id } = this.state;
        return (
            <div id={id} style={{ height: 600, overflow: 'auto', ...style }} {...props}></div>
        )
    }
}