import React, { Component } from 'react';

export class Button extends Component {
    titleRef = null;
    constructor(props) {
        super(props);
        this.state = {
            showEditorPanel: false,
            showEditorPanelTab: 0,
            title: 'Continue',
            padding_top: 0,
            padding_bottom: 0,
        }
    };

    clearContent = () => {
        this.props.onClickDelete(this.props.location);
    }

    showEditorPanel = () => {
        const { showEditorPanel } = this.state;
        this.setState({ showEditorPanel: !showEditorPanel });
    }

    showEditorPanelTab = (index) => {
        this.setState({ showEditorPanelTab: index });
    }

    setProperties = (sendData) => {
        const { title, padding_top, padding_bottom } = this.state;
        const { type } = this.props;
        const properties = {
            type,
            title: title,
            padding_bottom: padding_bottom,
            padding_top: padding_top,
            ...sendData
        };
        this.props.setPropertiesData(properties, this.props.location);
        this.setIsActive(true);
    }

    setIsActive = (isActive) => {
        this.setState({
            isActive
        });
    };

    changeProperties = (formContent) => {
        const { title, padding_top, padding_bottom } = formContent;
        this.setState({
            title: title,
            padding_top: padding_top,
            padding_bottom: padding_bottom,
        });
        // this.props.setPropertiesData(formContent, this.props.location);
    };

    getContent = () => {
        const { title, padding_top, padding_bottom } = this.state;
        let style = {
            padding_top,
            padding_bottom,
        }
        return {
            title,
            style,
            type: this.props.type
        };
    };


    render() {
        const { showEditorPanel, showEditorPanelTab, title, padding_top, padding_bottom } = this.state;
        return (
            <div className={`d-flex content pt-${padding_top} pb-${padding_bottom}`}>
                <div className='col-md-9 pl-0'>
                    <div className="d-flex align-items-center justify-content-start left-content position-relative">
                        <button className="btn btn-primary">{title}</button>
                    </div>
                </div>
                <div className="col-md-3 pr-0">
                    <div className="d-flex flex-wrap right-content">
                        <div className="d-block w-100 editor-buttons">
                            <i className="fal fa-arrow-down"></i>
                            <i className="fal fa-copy"></i>
                            <i className="fal fa-trash" onClick={this.clearContent}></i>
                            <i className="fal fa-pen" onClick={() => this.setProperties({})}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}