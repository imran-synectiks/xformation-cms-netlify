import React, { Component } from 'react';
export class CustomVideo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { containerClass, url, description, style } = this.props;
        return (
            <div className={containerClass} style={{ paddingTop: style.padding_top, padding_bottom: style.padding_bottom, backgroundColor: style.bgColor }}>
                <div className="col-8 pl-0">
                    <div className="d-flex flex-row flex-wrap left-content position-relative">
                        <div className="col-6">
                            <video width="320" height="240" controls>
                                <source src={url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="col-6">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}