import React, {useEffect} from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';
import ItemAddForm from "../item-add-form";
import { connect } from 'react-redux'
import {addItem, moveDown, moveUp, setItems, setLists} from '../../actions'
import axios from 'axios';


export const TodoListContainer = ({elements,  onAddItem, t_id}) => {

    return (
        <>
            <ul className='list-group todo-list'>
                { elements }
            </ul>
            <div className='wrapper__form'>
                <ItemAddForm
                    t_id={t_id}
                    addItem={onAddItem}
                />
            </div>
        </>
    )
};

const TodoList = ({ items, onAddItem, onSetLists, onMoveUP, onMoveDown, onSetItems, t_id}) => {

    const getItemsFromDb = async () => {
        const dataBase = await axios.get('http://localhost:3001/items/getItems');
        onSetItems(dataBase);
        console.log(dataBase)
    };

    const getListsFromDb = async () => {
        const dataBase = await axios.get('http://localhost:3001/lists/getLists');
        onSetLists(dataBase);
        console.log(dataBase)
    };

    useEffect(() => {
        getItemsFromDb();
        getListsFromDb();
    }, []);

    const arrPosition = items
        .filter((item) => item.parentId === t_id)
        .map(item => item.pos);

    const elements = items
        .filter((item) => item.parentId === t_id)
        .sort((a, b)=> a.pos - b.pos)
        .map((item) => {
        const {_id, ...itemProps} = item;
        return(
          <li key={_id}
              className='list-group-item'>
              <TodoListItem
                  {...itemProps}
                  id={_id}
                  arrPosition={arrPosition}
                  onMoveUP={() => onMoveUP(item)}
                  onMoveDown={() => onMoveDown(item)}
              />
          </li>
        );
    });

    return (
        <TodoListContainer elements={elements} t_id={t_id} onAddItem={onAddItem} />
    )
};


const mapStateToProps = (state, props) => {
    return {
        items: state.items
    }
    // console.log('MAPS STATE TO PROPS LIST', props);
    // const list = state.lists.find(list => list.parentId === props.parentId);
    // console.log('list' , list);
    // console.log('props' , props);
    // return {
    //     list,
    //     lists: state.lists,
    //     items: list ? state.items.filter(item => item.parentId === list.id) : [],
    // }
};

const mapDispatchToProps = (dispatch) => ({
    onAddItem: item => dispatch(addItem(item)),
    onSetLists: lists => dispatch(setLists(lists)),
    onSetItems: items => dispatch(setItems(items)),
    onMoveUP: item => dispatch(moveUp(item)),
    onMoveDown: item => dispatch(moveDown(item)),

});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);