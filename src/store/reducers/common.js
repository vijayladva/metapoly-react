
const initialState = {
    user:{}
};

export default function (state = initialState, action) {

    switch (action.type) {
        case 'SET_USER_DATA': {
            return {...state,user:{...state.user,...action.payload}};
        }
        default:
            return state;
    }
}
