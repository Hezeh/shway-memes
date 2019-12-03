import { SET_PROGRESS } from '../actions/actionTypes';
import {initialState} from '../../initialState'

export default function loadingBarReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROGRESS:
            state.progress = action.payload

            return {...state}
        default:
            return state
    }
}