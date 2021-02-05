import React from "react";

export default class Information extends React.Component {
    render() {
        return (
            <div>
                {this.props.header}
                <p>Hello there</p>
                {this.props.footer}
            </div>
        );
    };
};