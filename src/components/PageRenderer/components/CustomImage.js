import React, { Component } from 'react';
export class CustomImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { containerClass, url, description, style } = this.props;
        return (
            <div className={containerClass} style={{ paddingTop: style.padding_top, padding_bottom: style.padding_bottom, backgroundColor: style.bgColor }}>
                <div className='col-8 pl-0'>
                    <div className="d-flex align-items-center justify-content-center left-content">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-6">
                                <img src={url} alt="" />
                            </div>
                            <div className="col-6">
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}