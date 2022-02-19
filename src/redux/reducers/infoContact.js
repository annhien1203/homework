
export const UPDATE_FAVOURITE = "UPDATE_FAVOURITE";

const initialState = {
    favourite: {},
}

export default function actionForReducer(state = initialState, payload) {
    switch(payload.type) {
        case "UPDATE_FAVOURITE":
            return {
                ...state,
                favourite: payload.favourite
            }
        default:
            return state
    }
}