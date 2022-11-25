const initialState = {
    dataUser: [
        {
            username: "heber",
            password: "heber"
        }
    ]
};

function rootReducer(state = initialState, action) {
    switch (action.type) {

        default:
            return state;
    }
}

export default rootReducer;