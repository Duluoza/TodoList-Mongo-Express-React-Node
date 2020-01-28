const initialState = {
    items:[],
    lists: [],
};

const itemMove = (state, action, quantity) => {
    return {
        ...state,
        items: state.items.map(item => {
            if(item._id === action.payload._id) {
                const arrMove = state.items.filter((item) => item.parentId === action.payload.parentId);
                const itemMove = arrMove.find((item)=> item.pos === action.payload.pos );
                itemMove.pos = itemMove.pos + quantity;
                item.pos = action.payload.pos;
            }
            return item
        })
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ITEMS' :
            return {
                ...state, items: action.payload
            };
        case 'SET_LISTS' :
            return {
                ...state, lists: action.payload
            };
        case "ADD_ITEM" :
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case "DELETE_ITEM" :
            let delItem = state.items.find((el) => el._id === action.payload);
            let newArrayItems = state.items
                .filter(item => (!item.ancestors.includes(action.payload)) && item._id !== action.payload)
                .map(item => {
                    if (item.parentId === delItem.parentId && item.pos > delItem.pos) item.pos -= 1;
                    return item;
                });
            return {
                    ...state,
                    items: newArrayItems,
                    lists: state.lists
                        .filter(item => (!item.ancestors.includes(action.payload)) && item.parentId !== action.payload)
                };
        case "MOVE_UP" :
            return itemMove(state, action, 1);
        case "MOVE_DOWN" :
            return itemMove(state, action, -1);
        case "ADD_LIST" :
            return {
                ...state,
                lists: [...state.lists, action.payload],
            };
        case "DELETE_LIST" :
            return {
                items: state.items
                    .filter(item => (!item.ancestors.includes(action.payload)) && item._id !== action.payload),
                lists: state.lists
                    .filter(item => (!item.ancestors.includes(action.payload)) && item._id !== action.payload)
            };
        default:
            return state
    }
};

export default reducer;