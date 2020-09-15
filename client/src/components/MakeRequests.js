import React from 'react';
import {connect} from 'react-redux';
import {sendDataPOST, sendDataGET } from '../actions';

class MakeRequests extends React.Component {
    constructor(props) {
        super(props)
        this.state = { requestNum: 0 }
    }

    render() {

        return (
            <div>
                <button onClick={() => {
                    this.setState((state) => ({
                        requestNum: state.requestNum + 1
                      }));
                    return this.props.onSendDataGet("GET Request (" + this.state.requestNum + ") Get Button: " + new Date().toJSON())}
                    }>Test Get Data</button>
                <button onClick={() => {
                    this.setState((state) => ({
                        requestNum: state.requestNum + 1
                      }));
                      return this.props.onSendDataPost(this.state.requestNum + " Date " + new Date().toJSON())}
                    }>Test Post Data</button>
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
