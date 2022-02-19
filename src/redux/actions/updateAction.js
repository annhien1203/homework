import { UPDATE_FAVOURITE } from "../reducers/infoContact";
export const updateFavourite = (favourite) => async dispatch => {
    try {
        // gọi server hoặc làm gì đó bất đồng bộ, middwware vs thunk giúp làm
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve()
        //     }, 3000);
        // });
        // cập nhật store
        console.log("aaaaaaaaaaaaaaaaaa"+JSON.stringify(favourite));
        dispatch({
            type: UPDATE_FAVOURITE,
            favourite: favourite
        })
    } catch (error) {
    }
}