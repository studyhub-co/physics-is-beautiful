import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { checkHttpStatus, parseJSON } from '../utils';
import { DATA_FETCH_PROTECTED_DATA_REQUEST, DATA_RECEIVE_PROTECTED_DATA } from '../constants';
import { authLoginUserFailure } from './auth';


export function dataReceiveProtectedData(data) {
    return {
        type: DATA_RECEIVE_PROTECTED_DATA,
        payload: {
            data
        }
    };
}

export function dataFetchProtectedDataRequest() {
    return {
        type: DATA_FETCH_PROTECTED_DATA_REQUEST
    };
}

export function dataFetchProtectedData(token) {
    return (dispatch, state) => {
        dispatch(dataFetchProtectedDataRequest());
        return fetch(`/api/v1/getdata/`, {
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                Authorization: `Token ${token}`
            }
        })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then((response) => {
                dispatch(dataReceiveProtectedData(response.data));
            })
            .catch((error) => {
                dispatch(push('/login'));
                return Promise.resolve(); // TODO: we need a promise here because of the tests, find a better way
            });
    };
}
