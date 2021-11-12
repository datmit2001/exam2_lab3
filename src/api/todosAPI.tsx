import { axiosClient } from './axiosClient'
import { TodoListProps } from '../Interfaces'
const TodoAPI = {
    getAll() {
        const url = `/todos`;
        return axiosClient.get(url);
    },
    remove(id: number) {
        const url = `/todos/${id}`;
        return axiosClient.delete(url);
    },
    add(todo: TodoListProps) {
        const url = `/todos`;
        return axiosClient.post(url, todo);
    },
    update(id : number | string, data : TodoListProps) {
        const url = `/todos/${id}`;
        return axiosClient.put(url, data);
    }

}
export default TodoAPI;