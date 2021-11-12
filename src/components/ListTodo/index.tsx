import "./ListTodo.css";
import { TodoListProps } from '../../Interfaces'
interface Props {
  todoList: TodoListProps[];
  onDelete: (param: TodoListProps) => void
  onModal: (param: boolean) => void
}
export const ListTodo = ({ todoList, onDelete, onModal, onEditTodo }: any) => {
  return (
    <div className="ant-list-items">
      <div className="ant-list-item">
      {todoList.map((item: TodoListProps, index: number) => {
            return (
              <div className="ant-list-item-meta">
         
              <div className="ant-list-item-meta-content" key={index}>
                <div className="text-content">
                <h4 className="ant-list-item-meta-title">
                  <a>{item.name}</a>
                </h4>
                <div className="ant-list-item-meta-description">
                  {item.content}
                </div>
                </div>
                <ul className="ant-list-item-action">
            <li>
              <button className="btn-edit" onClick={() => onEditTodo(item)}>Edit</button>
            </li>
            <li>
              <button className="btn-remove" onClick={() => onDelete(item.id)}>Remove</button>
            </li>
          </ul>
              </div>
        </div>
            );
          })}
       
      </div>
    </div>
  );
};
