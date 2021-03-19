import React from 'react';
import * as Survey from "survey-react";
import 'survey-react/survey.css';

class SurveyCreator extends React.Component {
    constructor(props) {
        super(props);
        let data = [];
        if (props.data) {
            data = JSON.parse(props.data);
        }
        this.state = {
            data: data,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data && this.props.data) {
            let isError = false;
            let data = {};
            try {
                data = JSON.parse(this.props.data);
            }
            catch (e) {
                isError = true;
            }
            if (!isError) {
                this.setState({
                    data
                });
            }
        }
    }

    componentDidMount() {

    }

    render() {
        const { data } = this.state;
        var model = new Survey.Model(data);
        return (
            <Survey.Survey model={model} />
        );
    }
}

export default SurveyCreator;