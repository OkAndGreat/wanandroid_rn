import {getHomeList} from "../apis";
import store from "../store";
import {ActionType} from "../utils/Constant";

export function fetchHomeList() {
    getHomeList()
        .then(res => store.dispatch(createAction(ActionType.FETCH_HOME_LIST, res.data)))
        .catch(e => store.dispatch(createAction(ActionType.FETCH_HOME_LIST_FAILURE)))
}

function createAction(name, params = undefined) {
    return {
        type: name,
        params
    }
}