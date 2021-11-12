import React,{ useState } from 'react'
import { TodoListProps } from '../../Interfaces'
import { v4 as uuidv4 } from 'uuid';
interface Props {
    currentTodo: TodoListProps | null;
    onCancel: (param: boolean) => void;
    todoList: TodoListProps[];
    onAdd: (param: TodoListProps) => void
    onEdit: (param: TodoListProps) => void;
    onClose: () => void;
  }
export const AddTodoForm:React.FC<Props> = ({ todoList, onAdd ,onCancel, currentTodo, onEdit,onClose}) => {
    const [textName, setTextName] = useState(currentTodo?.name ||"")
    const [textContent, setTextContent] = useState(currentTodo?.content || "");
    const handleSubmit = (e: any) => {
        if (currentTodo && onEdit) {
            onEdit({
              id: currentTodo.id,
              name: textName,
              content: textContent,
            }); 
          } else if (onAdd) {
            onAdd({
              id: uuidv4(),
              name: textName ,
              content: textContent,
            });
          }
        e.preventDefault();
        onAdd({id : uuidv4(),name: textName, content: textContent})
        onCancel(true);
        setTextName("");
        setTextContent("");
    }
    const handleTextName = (e: any) => {
        setTextName(e.target.value);
      }
      const handleTextContent = (e: any) => {
        setTextContent(e.target.value);
      }
    return <div>
        <div className="field-input-group">
            <input placeholder="Name" type="text" className="ant-input"   value={textName}  onChange={ handleTextName} />
        </div>
        <div className="field-input-group">
            <input placeholder="Description" type="text" className="ant-input" value={textContent}  onChange={ handleTextContent}/>
        </div>
        <div className="modal-new-user-footer">
            <button className="ant-btn ant-btn-primary" onClick={ handleSubmit}>
                Save
            </button>
            <button className="ant-btn" style={{marginLeft: 10}} onClick={()=> onCancel(false)}>
                Cancel
            </button>
        </div>
    </div>
}
