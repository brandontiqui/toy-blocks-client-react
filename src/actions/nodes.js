import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

const getBlocksForNodeAction = (nodeUrl, blocks) => {
  return {
    type: types.GET_BLOCKS_FOR_NODE,
    blocks,
    nodeUrl,
  };
};


export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if(res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
    });
  };
}

export function getBlocksForNodeUrl(nodeUrl) {
  return async (dispatch) => {
    try {
      const res = await fetch(`${nodeUrl}/api/v1/blocks`);
      const json = await res.json();

      dispatch(getBlocksForNodeAction(nodeUrl, json.data));
    } catch (err) {
      console.error('Error getting blocks from node', err);
    }
  };
}