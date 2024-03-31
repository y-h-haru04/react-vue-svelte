<script setup lang="ts">
import { OPTIONS, Status, TABLE_HEADER, type Todo } from "common";

defineProps<{
  todoList: Todo[];
}>();

const emits = defineEmits<{
  (name: "clickRow", index: number): Promise<void>;
  (name: "clickDelete", index: number): Promise<void>;
}>();

const onClickRow = (index: number) => {
  emits("clickRow", index);
};

const onClickDelete = (e: MouseEvent, index: number) => {
  e.stopPropagation();
  emits("clickDelete", index);
};
</script>

<template>
  <div class="table-wrapper">
    <table v-if="todoList.length > 0">
      <thead>
        <tr>
          <th v-for="col in TABLE_HEADER">{{ col }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in todoList"
          :key="row.id"
          @click="onClickRow(index)"
        >
          <td>{{ row.title }}</td>
          <td>{{ row.deadline }}</td>
          <td>
            <div
              v-if="row.status === Status.BeforeStart"
              class="badge-before-start"
            >
              {{ OPTIONS[0].text }}
            </div>
            <div
              v-else-if="row.status === Status.Working"
              class="badge-working"
            >
              {{ OPTIONS[1].text }}
            </div>
            <div v-else-if="row.status === Status.Hold" class="badge-hold">
              {{ OPTIONS[2].text }}
            </div>
            <div v-else class="badge-completed">{{ OPTIONS[3].text }}</div>
          </td>
          <td>
            <button
              class="btn btn-danger"
              @click="e => onClickDelete(e, index)"
            >
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="p-lg w-full">There's no TODO.</div>
  </div>
</template>
