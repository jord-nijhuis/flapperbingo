
const numbers = (state = [], action) => {

    switch (action.type)
    {
        case 'ADD_NUMBER':
            return [
                ...state,
                action.number
            ];

        default:
            return state;
    }
};

export default numbers