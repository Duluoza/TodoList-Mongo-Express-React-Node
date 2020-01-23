import React, {useState} from 'react';

import './todo-list-item.css';
import TodoList from '../todo-list/todo-list'
import {connect} from 'react-redux'
import {addList, deleteItem, deleteList} from "../../actions";


const TodoListItem = (props) => {

    const {label, onDelete, pos, id, onMoveUP, onMoveDown, onAddList, arrPosition, onDeleteList, list, lists} = props;
    const [isChild, setIsChild] = useState(false);
    const [isDisable, setIsDisable] = useState(true);

    // if(list && list.parentId === id) {
    //     setIsChild(true);
    // }

    // const addList = (id) => {
    //     setIsChild(true);
    //     onAddList(id);
    //     setIsDisable(true)
    // };

    // const deleteList = (id) => {
    //     onDeleteList(id);
    //     setIsChild(false)
    //     setIsDisable(false)
    // };

    const deleteItem = (id) => {
        onDelete(id);
        setIsChild(false)
    };

    const addOrDeleteList = (id, quantity) => {
        if(quantity === 1) onAddList(id);
        if(quantity === 0) onDeleteList(id);
        setIsChild(!!quantity);
        setIsDisable(!!quantity);
    };

    const min = Math.min.apply(null, arrPosition);
    const max = Math.max.apply(null, arrPosition);

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
                                            onClick={onMoveUP}
                    >
                        <i className='fa fa-arrow-up'/>
                    </button>}
                    {max !== pos && <button type="button"
                                            className='btn btn-outline-success btn-sm btn-down'
                                            onClick={onMoveDown}

                    >
                        <i className='fa fa-arrow-down'/>
                    </button>}

                </div>
            </span>
            <div className='todo-list-sub'>
                {list && list.parentId === id &&
                <>
                    <TodoList t_id={id} key={id}/>
                    <button
                        className="btn btn-outline-danger"
                        onClick={() => addOrDeleteList(id , 0)}
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
    lists: state.lists
});

const mapDispatchToProps = (dispatch) => ({
    onAddList: id => dispatch(addList(id)),
    onDelete: id => dispatch(deleteItem(id)),
    onDeleteList: id => dispatch(deleteList(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem)