import {getHomeBanner, getHomeList} from "apis";
import store from "store";
import {ActionType} from "utils/Constant";
import {createAction} from "actions/index";

export function fetchHomeList() {
    getHomeList()
        .then(res => store.dispatch(createAction(ActionType.FETCH_HOME_LIST, res.data)))
        .catch(e => store.dispatch(createAction(ActionType.FETCH_HOME_LIST_FAILURE)))
}

export function fetchHomeBanner() {
    getHomeBanner()
        .then(res => store.dispatch(createAction(ActionType.FETCH_HOME_BANNER, res.data)))
        .catch(e => store.dispatch(createAction(ActionType.FETCH_HOME_BANNER_FAILURE)))
}
