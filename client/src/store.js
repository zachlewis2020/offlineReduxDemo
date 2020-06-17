import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { offline, createOffline } from '@redux-offline/redux-offline';
import defaultConfig from '@redux-offline/redux-offline/lib/defaults';
import { sendDataPOST, sendDataGET, SEND_DATA_GET, SEND_DATA_POST } from '../src/actions';

const initialState = {
  timer: 0
};


export function offlineReducer(state = initialState, action) {
  if (action.type === 'Offline/SCHEDULE_RETRY') {
    return {
      ...state,
      timer: action.payload.delay / 1000
    };
  }
  if (action.type === 'TICK') {
    return {
      ...state,
      timer: state.timer === 0 ? 0 : state.timer - 1
    };
  }
  return state;
}

const reducer = combineReducers({offlineReducer, sendDataGET, sendDataPOST })

const config = {
  ...defaultConfig,
  retry(_action, retries) {
    return (retries + 1) * 1000;
  },
  returnPromises: true
};

function tickMiddleware(store) {
  return next => action => {
    if (action.type === 'Offline/SCHEDULE_RETRY') {
      const intervalId = setInterval(() => {
        store.dispatch({ type: SEND_DATA_GET });
      }, 1000);
      setTimeout(() => clearInterval(intervalId), action.payload.delay);
    }
    return next(action);
  };
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;
if (process.env.REACT_APP_OFFLINE_API === 'alternative') {
  const { enhanceReducer, enhanceStore } = createOffline(config);
  store = createStore(
    enhanceReducer(reducer),
    undefined,
    composeEnhancers(enhanceStore)
  );
} else {
  store = createStore(
    reducer,
    composeEnhancers(offline(config), applyMiddleware(tickMiddleware))
  );
}

export default store;
