import React, { Component } from 'react';
import FormContent from './FormContent';
import './css/renderer.css';

export class Renderer extends React.Component {
    formRefs;
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.formData,
            activeIndex: 0,
            loading: false,
        }
        this.formRefs = React.createRef();
    };

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps.formData) !== JSON.stringify(this.props.formData)) {
            this.setState({
                data: this.props.formData,
                activeIndex: 0,
            });
            this.createRefs(this.props.formData);
        }
    }

    navigateTab(index) {
        const { data } = this.state;
        let length = data.length;
        if (index >= 0 && index <= length - 1) {
            this.setState({
                activeIndex: index
            });
        }
    }

    onClickNext = () => {
        const { activeIndex } = this.state;
        let data = this.formRefs[activeIndex].current.getDataFromForm(true);
        if (data.isValid) {
            delete data.isValid;
            let wholeData = [];
            for (let i = 0; i < this.formRefs.length; i++) {
                let newData = this.formRefs[i].current.getDataFromForm(false);
                wholeData = wholeData.concat(newData.formData);
            }
            // this.reFormateData(wholeData);
            this.callApi(wholeData);
        }
    };

    reFormateData = (data) => {
        let jsonData = {};
        Object.keys(data).forEach((index) => {
            let row = data[index];
            // if (row.value) {
            jsonData = {
                ...jsonData,
                [row['name']]: row.value
            };
            // }
        });
        return jsonData;
    }

    callApi = (jsonData) => {
        jsonData = this.reFormateData(jsonData);
        const { activeIndex, data } = this.state;
        if (data[activeIndex] && data[activeIndex].apiEndPoint) {
            let requestOptions = {
                method: "POST",
                body: JSON.stringify(jsonData)
            };
            if (this.props.getApiHeaders) {
                let headers = this.props.getApiHeaders();
                requestOptions = {
                    ...requestOptions,
                    headers
                };
            }
            this.setState({
                loading: true
            });
            let apiCall = fetch(data[activeIndex].apiEndPoint, requestOptions).then(response => response.json());
            apiCall.then(
                response => {
                    this.navigateTab(activeIndex + 1);
                    this.setState({
                        loading: false
                    });
                    if (this.props.onFormSubmitted) {
                        this.props.onFormSubmitted(activeIndex, response);
                    }
                },
                error => {
                    this.navigateTab(activeIndex + 1);
                    this.setState({
                        loading: false
                    });
                    if (this.props.onFormSubmitted) {
                        this.props.onFormSubmitted(activeIndex, error);
                    }
                }
            );
        } else if (this.props.onChangeTab) {
            this.setState({
                loading: true,
            });
            this.props.onChangeTab(activeIndex, jsonData);
        } else {
            this.navigateTab(activeIndex + 1);
        }
    };

    showNextTab = () => {
        this.setState({
            loading: false,
        });
        this.navigateTab(this.state.activeIndex + 1);
    };

    onSuccessfulCall = () => {
        this.setState({
            loading: false
        });
    };


    onChangeComponent = (e, componentIndex, type) => {
        const { activeIndex } = this.state;
        if (this.props.onChangeComponent) {
            this.props.onChangeComponent(e, type, activeIndex, componentIndex);
        }
    };

    displaytabContent = () => {
        const { data } = this.state;
        let tabData = [];
        for (let i = 0; i < data.length; i++) {
            let row = data[i];
            console.log(row);
            if (row) {
                tabData.push(
                    <div style={{ display: 'block' }}>
                        <FormContent key={`formcontent-${i}`} content={data} ref={this.formRefs} onChangeComponent={this.onChangeComponent} />
                    </div>
                )
            } else {
                tabData.push(
                    <div key={`formcontent-${i}`}></div>
                )
            }
        }
        return tabData;
    }

    render() {
        const { data, activeIndex, loading } = this.state;
        return (
            <div className="container">
                <div className="d-block">
                    <div className="">
                        <div style={{ display: 'block' }}>
                            <FormContent content={data} ref={this.formRefs} onChangeComponent={this.onChangeComponent} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}