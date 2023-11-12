<template>
  <footer class="app-footer">{{ stats.active }} more to do, {{ stats.done }} done</footer>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { todoAPI } from '@/components/api/api';
import { Todo } from '@/types/Todo'; 

export interface Stats {
  active: number,
  done: number,
}

export default defineComponent({
  props: {
    stats: {
      type: Object as PropType<Stats>,
      required: true,
    },
  },
  created() {
    this.updateStats(); // Вызов при загрузке компонента
  },
  methods: {
    async updateStats() {
      try {
        const response = await todoAPI.getAllTodos();
        const todos: Todo[] = response.data; // Уточнение типа данных

        this.$emit('updateStats', {
          active: todos.filter(todo => !todo.completed).length,
          done: todos.filter(todo => todo.completed).length,
        });
      } catch (error) {
        console.error('Error updating stats:', error);
      }
    },
  },
});
</script>
