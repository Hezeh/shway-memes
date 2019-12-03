import { SET_PROGRESS } from './actionTypes'

export const setLoadingBarProgress = value => ({
    type: SET_PROGRESS,
    payload: value
})