import React from 'react';
import { Provider } from 'react-redux';
import MakeRequests from './MakeRequests';
import RequestsQueue from './RequestsQueue';
import SyncStatus from './SyncStatus';
import store from '../store';
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
    },
  }),
});

var query = '{ hello }';

graphql(schema, query).then((result) => {
    console.log(result);
});

class App extends React.Component {

  state = {
    page: 'demo',
    status: '',
    time: null,
    payload: '--null--'
  };

  pages = {
    home: { page: 'home', status: '', payload: '--null--', time: null },
    demo: { page: 'demo', status: '', payload: '--null--', time: null },
  }

  onSuccess = payload => this.setState(() => ({
    time: Date.now(),
    status: 'success',
    payload: JSON.stringify(payload, null, '  ')
  }))

  onError = payload => this.setState(() => ({
    time: Date.now(),
    status: 'error',
    payload: JSON.stringify(payload, null, '  ')
  }))

  render() {
    const { page, status, payload, time } = this.state;
    graphql(schema, query).then((result) => {
      console.log(result);
    });
    return (
      <Provider store={store}>
        <div className="container">
          <div>
            <SyncStatus />
            <RequestsQueue />
            <MakeRequests
              successCallback={page === 'promise' && this.onSuccess}
              errorCallback={page === 'promise' && this.onError}
            />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
