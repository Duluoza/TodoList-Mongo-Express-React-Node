const initialState = {
    items:[],
    lists: [],
};

// let id = 1;
// let l_id = 0;

const itemMove = (state, action, quantity) => {
    return {
        ...state,
        items: state.items.map(item => {
            if(item.id === action.payload.id) {
                const arrMove = state.items.filter((item) => item.parentId === action.payload.parentId);
                const itemMove = arrMove.find((item)=> item.pos === action.payload.pos - quantity );
                itemMove.pos = itemMove.pos + quantity;
                const position = action.payload;
                position.pos = position.pos - quantity;
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
            // const arrItemsForList = state.items.filter(item => item.parentId === action.payload.t_id);
            // if(arrItemsForList.length === 0){
            //     action.payload.pos = 1
            // } else if(arrItemsForList.length + 1 !== action.payload.pos){
            //     action.payload.pos = arrItemsForList.length + 1
            // }
            return {
                ...state,
                items: [...state.items, action.payload]
                    // {
                    //     label: action.payload.label,
                    //     id: id++,
                    //     pos: action.payload.pos++,
                    //     parentId: action.payload.t_id,
                    // }],

            };
        case "DELETE_ITEM" :
            let delItem = state.items.find((el) => el._id === action.payload);
            let newArray = state.items
                .filter(item => (!item.ancestors.includes(action.payload)) && item._id !== action.payload)
                .map(item => {
                    if (item.parentId === delItem.parentId && item.pos > delItem.pos) item.pos -= 1;
                    return item;
                });
            return {
                    ...state,
                    items: newArray,
                    lists: state.lists
                        .filter(item => (!item.ancestors.includes(action.payload)) && item.parentId !== action.payload)
                };
        case "MOVE_UP" :
            return itemMove(state, action, 1);
        case "MOVE_DOWN" :
            return itemMove(state, action, -1);
        case "ADD_LIST" :
            console.log('add-listtt' , action.payload)
            return {
                ...state,
                lists: [...state.lists, action.payload],
            };
        case "DELETE_LIST" :
            const filter = (item => item.parentId !== action.payload);
            return {
                ...state,
                items: state.items.filter(filter),
                lists: state.lists.filter(filter)
            };
        default:
            return state
    }
};

export default reducer;