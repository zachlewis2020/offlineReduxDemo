import React from 'react';
import {connect} from 'react-redux';
import {sendDataPOST, sendDataGET } from '../actions';

class MakeRequests extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <button onClick={() => this.props.onSendDataGet("From Get Button: " + new Date().toJSON())}>Test Get Data</button>
                <button onClick={() => this.props.onSendDataPost("From post Button: " + new Date().toJSON())}>Test Post Data</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSendDataGet: data => dispatch(sendDataGET(data)),
        onSendDataPost: data => dispatch(sendDataPOST(data)),
    };
}

const ConnectedComponent = connect(null, mapDispatchToProps)(MakeRequests);

export default ConnectedComponent;
