import React, {useState, useEffect} from 'react';
import { Modal } from 'antd';

import {ListTodo} from './components/ListTodo'
import {AddTodoForm} from './components/AddTodoForm'
import { TodoListProps } from './Interfaces'
import 'antd/dist/antd.css'
import './App.css';
import TodoAPI from './api/todosAPI';

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<TodoListProps | null>(null)
    const [todoList, settodoList] = useState<TodoListProps[]>([
    ]);

    const handleOpenModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }
    
    useEffect(() => {
        //call api
        const getTodos = async () => {
          try {
            const { data: list } = await TodoAPI.getAll();
            // console.log(list)
            settodoList(list)
          } catch (error) {
            console.log(error)
          }
        }
        getTodos();
      },[])
      const handleDeleteTodo = async (id: number) => {
        try {
             await TodoAPI.remove(id);
             const newProducts = todoList.filter(todo => todo.id !== id);
             settodoList(newProducts);
        } catch (error) {
           console.log(error);
        }
       }
       const handleAddTodo = async (todo : TodoListProps) => {
        // console.log(todo)
        try {
          const { data } = await TodoAPI.add(todo);
        //   console.log(data);
          settodoList([...todoList,data]);
        } catch (error) {
          console.log(error);
        }  
      }

      const handleClose = () => {
        setIsModalVisible(false);
      }
      const handleEditTodo = (todo: TodoListProps) => {
        // console.log(itemProduct);
        setCurrentTodo(todo);
        setIsModalVisible(true);
      } 
      const handleUpdateTodo = async (todo: TodoListProps) => {
          const list = todoList.map((item) => {
              if(item.id === todo.id) {
                  return {
                      ...todo
                  }
              }
              return item;
          })
          handleClose();
          try {
            await TodoAPI.update(todo.id, todo);
            settodoList(list);
          } catch (error) {
            console.log(error);
          }
    
      } 
    return (
        <div className="App">
            <h2>List todo</h2>
            <div className="header-add-user">
                <button className="ant-btn ant-btn-primary" onClick={handleOpenModal}>
                    Add New Todo
                </button>
            </div>
            <ListTodo todoList={todoList} onDelete={handleDeleteTodo} onModal={handleOpenModal} onEditTodo={handleEditTodo}/>
            <Modal title="Add Todo" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <AddTodoForm currentTodo={currentTodo} todoList={todoList} onAdd={handleAddTodo} onEdit={handleUpdateTodo} onCancel={handleCancel} onClose={handleClose}/>
            </Modal>
        </div>
    );
}

export default App;
