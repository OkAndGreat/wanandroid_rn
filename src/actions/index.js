
export function createAction(name, params = undefined) {
    return {
        type: name,
        params
    }
}