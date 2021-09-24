import React, { Component } from 'react';
export class CustomDivider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { containerClass, style } = this.props;
        return (
            <div className={containerClass} style={{ paddingTop: style.padding_top, padding_bottom: style.padding_bottom, backgroundColor: style.bgColor }}>
                <div className="paragraph-toggle">
                    {`Divider`} <i className="fas fa-caret-down"></i>
                </div>
            </div>
        );
    }
}