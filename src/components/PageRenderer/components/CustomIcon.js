import React, { Component } from 'react';
export class CustomIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    displayIconList = () => {
        const { ListingData } = this.props;
        let retData = [];
        if (ListingData) {
            for (let i = 0; i < ListingData.length; i++) {
                retData.push(
                    <div className="col-4">
                        {/* <p><img src={iconImage} alt="" className="mb-2 w-50" /></p> */}
                        <p>
                            {ListingData[i].value}
                        </p>
                    </div>
                );
            }
        }
        return retData;
    }

    render() {
        const { containerClass, style } = this.props;
        return (
            <div className={containerClass} style={{ paddingTop: style.padding_top, padding_bottom: style.padding_bottom, backgroundColor: style.bgColor }}>
                <div className='col-8 pl-0'>
                    <div className="d-flex flex-row flex-wrap text-center left-content">
                        <div className="row">
                            {this.displayIconList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}