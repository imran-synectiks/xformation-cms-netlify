import React, { Component } from 'react';
export class CustomList extends React.Component {
    constructor(props) {
        super(props);
    }

    displayListing = () => {
        const { ListingData } = this.props;
        let retData = [];
        if (ListingData) {
            for (let i = 0; i < ListingData.length; i++) {
                retData.push(
                    <li>
                        {ListingData[i].value}
                    </li>
                )
            }
        }
        return retData;
    }

    render() {
        const { containerClass, style } = this.props;
        return (
            <div className={containerClass} style={{ paddingTop: style.padding_top, padding_bottom: style.padding_bottom, backgroundColor: style.bgColor }}>
                <ul>
                    {this.displayListing()}
                </ul>
            </div>
        );
    }
}