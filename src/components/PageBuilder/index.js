import React, { Component } from 'react';
import './css/workflow.css';
import { Heading, List, Image, Video, Icon, Divider, Button, HTMLProperties } from './components';
import { Scrollbars } from 'react-custom-scrollbars';
import { menuIcons } from './img';
import { v4 } from 'uuid';

export const componentType = {
    HEADING: "heading",
    LIST: "list",
    IMAGE: "image",
    VIDEO: "video",
    ICON: "icon",
    DIVIDER: "divider",
    BUTTON: "button"
};

export class PageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarData: [
                {
                    title: 'Text',
                    type: componentType.HEADING,
                    value: 'text',
                    iconImg: menuIcons.text
                },
                {
                    title: 'List',
                    type: componentType.LIST,
                    value: 'list',
                    iconImg: menuIcons.list
                },
                {
                    title: 'Image',
                    type: componentType.IMAGE,
                    value: 'image',
                    iconImg: menuIcons.image
                },
                {
                    title: 'Video',
                    type: componentType.VIDEO,
                    value: 'video',
                    iconImg: menuIcons.video
                },
                {
                    title: 'Icon',
                    type: componentType.ICON,
                    value: 'icon',
                    iconImg: menuIcons.icon
                },
                {
                    title: 'Divider',
                    type: componentType.DIVIDER,
                    value: 'divider',
                    iconImg: menuIcons.divider
                },
                {
                    title: 'Button',
                    type: componentType.BUTTON,
                    value: 'button',
                    iconImg: menuIcons.button
                }
            ],
            formDataContent: [],
            formData: {},
            showRightPart: false,
            propertiesJsonData: [],
        };
        this.formContentRefs = [];
        this.propertiesRef = React.createRef();
    };

    displaySideBar = () => {
        const { sidebarData } = this.state;
        const sidebarReturnData = [];
        for (let i = 0; i < sidebarData.length; i++) {
            let row = sidebarData[i];
            sidebarReturnData.push(
                <li key={v4()} onClick={e => this.displayFormContent(row)}>
                    <div className="d-block">
                        <span><img src={row.iconImg} alt={row.title} width="40" height="40" /></span>
                        <p>{row.title}</p>
                    </div>
                </li>
            )
        }
        return sidebarReturnData;
    }

    displayFormContent = (fieldData) => {
        const { formDataContent, activeLocation } = this.state;
        const { type } = fieldData;
        const ref = React.createRef();
        const location = {
            index: this.formContentRefs.length
        };
        if (type === componentType.HEADING) {
            formDataContent.push(<Heading type={type} ref={ref} location={location} key={v4()} onClickDelete={this.onClickDelete} setPropertiesData={this.setProperty} activeLocation={activeLocation} />);
        } else if (type === componentType.LIST) {
            formDataContent.push(<List type={type} ref={ref} location={location} key={v4()} onClickDelete={this.onClickDelete} setPropertiesData={this.setProperty} activeLocation={activeLocation} />);
        } else if (type === componentType.IMAGE) {
            formDataContent.push(<Image type={type} ref={ref} location={location} key={v4()} onClickDelete={this.onClickDelete} setPropertiesData={this.setProperty} activeLocation={activeLocation} />);
        } else if (type === componentType.VIDEO) {
            formDataContent.push(<Video type={type} ref={ref} location={location} key={v4()} onClickDelete={this.onClickDelete} setPropertiesData={this.setProperty} activeLocation={activeLocation} />);
        } else if (type === componentType.ICON) {
            formDataContent.push(<Icon type={type} ref={ref} location={location} key={v4()} onClickDelete={this.onClickDelete} setPropertiesData={this.setProperty} activeLocation={activeLocation} />);
        } else if (type === componentType.DIVIDER) {
            formDataContent.push(<Divider type={type} ref={ref} location={location} key={v4()} onClickDelete={this.onClickDelete} setPropertiesData={this.setProperty} activeLocation={activeLocation} />);
        } else if (type === componentType.BUTTON) {
            formDataContent.push(<Button type={type} ref={ref} location={location} key={v4()} onClickDelete={this.onClickDelete} setPropertiesData={this.setProperty} activeLocation={activeLocation} />);
        }
        this.formContentRefs.push(ref);
        this.setState({
            formDataContent,
        });
    }

    displayContent = () => {
        const { formDataContent } = this.state;
        const retData = [];
        for (let i = 0; i < formDataContent.length; i++) {
            retData.push(
                <div className="formDataContent" key={i}>
                    {formDataContent[i]}
                </div>
            );
        }
        return retData;
    }

    onClickDelete = (location) => {
        const { formDataContent } = this.state;
        if (location) {
            const { index } = location;
            this.formContentRefs.splice(index, 1);
            formDataContent.splice(index, 1);
            this.setState({
                formDataContent,
                activeLocation: {},
                showRightPart: false
            });
        }
    };

    setProperty = (data, location) => {
        const { activeLocation, propertiesJsonData } = this.state;
        if (activeLocation) {
            let refArr = this.formContentRefs[activeLocation.index];
            if (refArr && refArr.length > 0) {
                const ref = refArr[activeLocation.index];
                ref && ref.current.setIsActive(false);
            }
            this.setState({
                showRightPart: true,
                activeLocation: location
            });
        } else {
            this.setState({
                showRightPart: true,
                activeLocation: location
            });
        }
        this.propertiesRef.current.setProperties(data, location);
    }

    showRightbar = () => {
        const { showRightPart } = this.state;
        let showright = !showRightPart;
        this.setState({
            showRightPart: showright,
        })
    }

    changeWorkProperties = (formdata) => {
        const { activeLocation, propertiesJsonData } = this.state;
        const ref = this.formContentRefs[activeLocation.index];
        if (ref) {
            ref.current.changeProperties(formdata);
        }
    }

    setWorkflowJson = (data, index) => {
        const { propertiesJsonData } = this.state;
        let Data = {
            ...data,
            index
        }
        let proData = propertiesJsonData;
        if (propertiesJsonData && propertiesJsonData.length > 0) {
            for (let i = 0; i < propertiesJsonData.length; i++) {
                if (propertiesJsonData[i].index == index) {
                    propertiesJsonData.splice(i, 1);
                    proData.push(Data);
                } else {
                    proData.push(propertiesJsonData[i]);
                }
            }
        } else {
            proData.push(Data);
        }
        this.setState({
            propertiesJsonData: proData
        });
    }

    showCreateWorkflow = () => {
        const { showEditorPage } = this.state;
        let content = [];
        for (let j = 0; j < this.formContentRefs.length; j++) {
            if (this.formContentRefs[j]) {
                content.push(this.formContentRefs[j].current.getContent());
            }
        }
        console.log(content);
        this.setState({
            showEditorPage: !showEditorPage,
            properties: JSON.stringify(content)
        })
    }


    render() {
        const { showRightPart, showEditorPage, properties } = this.state;
        return (
            <div className="d-block editor-container" >
                <div className="heading">
                    PAGE BUILDER
                </div>
                <div className="d-block page-heading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Topic 1 | page 1</h2>
                            </div>
                            <div className="col-md-6">
                                <div className="d-block text-right">
                                    <button className="btn btn-primary preview-btn">Preview</button>
                                    <button className="btn btn-primary" onClick={this.showCreateWorkflow}>Create Workflow</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="left-side">
                    <Scrollbars
                        style={{ maxHeight: '100%' }}
                    >
                        <ul>
                            {this.displaySideBar()}
                        </ul>
                    </Scrollbars>
                </div>
                {!showEditorPage &&
                    <>
                        <div className="right-container">
                            <div style={{ height: 'calc(100% - 0px)', display: 'flex', paddingLeft: '0px', paddingRight: '0px' }}>
                                <Scrollbars
                                    style={{ maxHeight: '100%' }}
                                >
                                    {this.displayContent()}
                                </Scrollbars>
                            </div>
                        </div>
                        <div className={`right-side ${showRightPart ? '' : 'd-none'}`}>
                            <div className="d-block">
                                <HTMLProperties ref={this.propertiesRef} hideRightSide={this.showRightbar} changeProperties={this.changeWorkProperties} />
                            </div>
                        </div>
                    </>
                }
                {showEditorPage &&
                    <div className="right-container">
                        <textarea className="form-control" rows={6} value={properties}></textarea>
                    </div>
                }
            </div>
        );
    }
}