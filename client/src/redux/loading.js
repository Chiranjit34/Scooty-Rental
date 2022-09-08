const initialData = {
    loading: false
};

export const loading = (state = initialData, {type, payload}) => {
    switch(type) {
        case 'LOADING': {
            return{
                ...state,
                loading: payload
            }
        }
        default: return state
    }
}