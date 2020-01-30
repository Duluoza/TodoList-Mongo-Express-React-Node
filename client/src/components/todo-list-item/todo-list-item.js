import React, {useState} from 'react';

import './todo-list-item.css';
import TodoListContainer from '../todo-list-container'
import {connect} from 'react-redux'
import {addList, deleteItem, deleteList, moveUpAndDown} from "../../actions";


const TodoListItem = (props) => {
    const {label, onDelete, pos, id, onMove, onAddList, arrPosition, onDeleteList, list,} = props;

    const [isDisable, setIsDisable] = useState(true);

    const moveUpAndDownItem = (id, quantity) => {
        const movedItems = arrPosition.sort((a, b) => a.pos - b.pos);
        const itemPositionIndex = movedItems.findIndex(item => item._id === id);
        if(quantity === 1) onMove(movedItems[itemPositionIndex], movedItems[itemPositionIndex - quantity], 1);
        if(quantity === -1) onMove(movedItems[itemPositionIndex], movedItems[itemPositionIndex - quantity], -1);
    };

    const addOrDeleteList = (id, quantity) => {
        if(quantity === 1) onAddList(id);
        if(quantity === 0) onDeleteList(id);
        setIsDisable(!!quantity);
    };

    const deleteItem = (id) => {
        onDelete(id);
    };

    const itemPosition = arrPosition.map(item => item.pos);
    const min = Math.min.apply(null, itemPosition);
    const max = Math.max.apply(null, itemPosition);

    return (
        <>
            <span className="todo-list-item">
                <span
                    className="todo-list-item-label"
                >
                {label} <span className="todo-list-pos">pos {pos}, id {id}</span>
                </span>

                <button type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteItem(id)}
                >
                        <i className="fa fa-trash-o"/>
                </button>
                <button type="button"
                        className='btn btn-outline-warning btn-sm'
                        onClick={() => addOrDeleteList(id, 1)}
                        disabled={list && isDisable}

                >
                        <i className='fa fa-plus-circle'/>
                </button>
                <div className='todo-list-item-arrow_move'>
                    {min !== pos && <button type="button"
                                            className='btn btn-outline-success btn-sm btn-up'
                                            onClick={() => moveUpAndDownItem(id, 1)}
                    >
                        <i className='fa fa-arrow-up'/>
                    </button>}
                    {max !== pos && <button type="button"
                                            className='btn btn-outline-success btn-sm btn-down'
                                            onClick={() => moveUpAndDownItem(id, -1)}

                    >
                        <i className='fa fa-arrow-down'/>
                    </button>}

                </div>
            </span>
            <div className='todo-list-sub'>
                {list && list.parentId === id &&
                <>
                    <TodoListContainer listId={list._id} key={list._id}/>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => addOrDeleteList(list._id , 0)}
                    >
                        Delete
                    </button>
                </>
                }
            </div>
        </>
    );
};

const mapStateToProps = (state, props) => ({
    list: state.lists.find(list => list.parentId === props.id),
});

const mapDispatchToProps = (dispatch) => ({
    onAddList: id => dispatch(addList(id)),
    onDelete: id => dispatch(deleteItem(id)),
    onDeleteList: id => dispatch(deleteList(id)),
    // onMoveUP: (first, child, quantity) => dispatch(moveUp(first, child, quantity)),
    // onMoveDown: (first, child, quantity) => dispatch(moveDown(first, child, quantity)),
    onMove: (first, child, quantity) => dispatch(moveUpAndDown(first, child, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem)