import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3300"
})

export const todoAPI = {
    getAllTodos() {
      return instance.get('/loadTodo');
    },
    addTodoToDB(todo: Todo) {
        return instance.post('/addTodo', todo);
    },
    removeTodoFromDB(id: number) {
        return instance.delete(`/removeTodo/${id}`);
    },
    toggleTodoInDB(id: number) {
        return instance.patch(`/toggleTodo/${id}`);
    },
}