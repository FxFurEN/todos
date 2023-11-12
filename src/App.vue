<template>
  <AppHeader />

  <AppFilters
    :active-filter="activeFilter"
    @set-filter="setFilter"
  />

  <main class="app-main">
    <AppTodoList
      :todos="filterdTodos"
      @toggle-todo="toggleTodo"
      @remove-todo="removeTodo"
    />

    <AppAddTodo @add-todo="addTodo" />
  </main>

  <AppFooter :stats="stats"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppFilters from './components/AppFilters.vue';
import AppTodoList from './components/AppTodoList.vue';
import AppAddTodo from './components/AppAddTodo.vue';
import AppFooter, { Stats } from './components/AppFooter.vue';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import {todoAPI} from './components/api/api';

interface State {
  todos: Todo[],
  activeFilter: Filter
}

export default defineComponent({
  components: {
    AppHeader,
    AppFilters,
    AppTodoList,
    AppAddTodo,
    AppFooter,
  },
  created() {
    this.fetchTodos(); // Вызов при загрузке компонента
  },
  data(): State {
    return {
      todos: [],
      activeFilter: 'All'
    }
  },
  computed: {
    filterdTodos(): Todo[] {
      switch (this.activeFilter) {
        case 'Active':
          return this.activeTodos
        case 'Done':
          return this.doneTodos
        case 'All':
        default:
          return this.todos
      }
    },
    stats(): Stats {
      return {
        active: this.activeTodos.length,
        done: this.doneTodos.length,
      }
    },
    activeTodos(): Todo[] {
      return this.todos.filter(todo => !todo.completed)
    },
    doneTodos(): Todo[] {
      return this.todos.filter(todo => todo.completed)
    }
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await todoAPI.getAllTodos();
        this.todos = response.data; 
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },


    async addTodo(todo: Todo) {
      try {
        const response = await todoAPI.addTodoToDB(todo);
        const addedTodo = response.data;
        this.todos.push(addedTodo);
        await this.fetchTodos();
      } catch (error) {
        console.error('Error adding todo to DB:', error);
      }
    },

    async removeTodo(id: number) {
      try {
        await todoAPI.removeTodoFromDB(id);
        await this.fetchTodos(); 
      } catch (error) {
        console.error('Error removing todo from DB:', error);
      }
    },


    async toggleTodo(id: number) {
      try {
        await todoAPI.toggleTodoInDB(id);
        await this.fetchTodos();
      } catch (error) {
        console.error('Error toggling todo in DB:', error);
      }
    },


    setFilter(filter: Filter) {
      this.activeFilter = filter
    }
  }
})
</script>
