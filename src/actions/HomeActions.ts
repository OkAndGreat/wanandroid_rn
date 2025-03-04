import {getHomeBanner, getHomeList} from "apis";
import store from "store";
import {ActionTypes} from "utils/Constant";
import {createAction} from "actions/index";

export function fetchHomeList(onFetchEnd?: () => void) {
    getHomeList()
        .then(res => {
            store.dispatch(createAction(ActionTypes.FETCH_HOME_LIST, res.data))
        })
        .catch(e => {

        })
        .finally(() => {
            if (onFetchEnd) {
                onFetchEnd()
            }
        })
}

export function loadMoreHomeList(page: number, onLoadMoreSuccess: (res) => void, onLoadMoreFailure: () => void) {
    getHomeList(page)
        .then(res => {
            onLoadMoreSuccess(res.data.datas)
            store.dispatch(createAction(ActionTypes.LOAD_MORE_HOME_LIST, res.data))
        })
        .catch(e => {
            onLoadMoreFailure()
        })

}

export function fetchHomeBanner() {
    getHomeBanner()
        .then(res => store.dispatch(createAction(ActionTypes.FETCH_HOME_BANNER, res.data)))
        .catch(e => {

        })
}
