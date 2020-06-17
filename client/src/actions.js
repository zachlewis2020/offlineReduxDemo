export const SEND_DATA_GET = 'SEND_DATA';
export const SEND_DATA_GET_SUCCESS = 'SEND_DATA_SUCCESS';
export const SEND_DATA_GET_FAILED = 'SEND_DATA_FAILED';

export const SEND_DATA_POST = 'SEND_DATA';
export const SEND_DATA_POST_SUCCESS = 'SEND_DATA_SUCCESS';
export const SEND_DATA_POST_FAILED = 'SEND_DATA_FAILED';

/*  Not Needed for Demo
function sendDataGetCreator(sentData) {
  return {
    type: SEND_DATA_GET,
    payload: sentData
  }
}

function sendDataPostCreator(sentData) {
  return {
    type: SEND_DATA_POST,
    payload: sentData
  }
}
*/

function sendDataPOST(sentData) {
  return {
    type: SEND_DATA_POST, payload: { sentData },
    meta: {
      offline: {
        effect: { url: '/postTest', method: 'POST', body: JSON.stringify({ body: "body POST Data", data: `${sentData}` } ) },
        commit: { type: SEND_DATA_POST_SUCCESS },
        rollback: { type: SEND_DATA_POST_FAILED }
      }
    }
  };
}

function sendDataGET(sentData) {
  return {
    type: SEND_DATA_GET, payload: {sentData},
    meta: {
      offline: {
        effect: { url: '/getTest?data=' + `${sentData}`, method: 'GET' },
        commit: { type: SEND_DATA_GET_SUCCESS },
        rollback: { type: SEND_DATA_GET_FAILED }
      }
    }
  };
}

export { sendDataGET, sendDataPOST };
