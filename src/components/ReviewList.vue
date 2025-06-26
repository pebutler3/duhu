<script setup>
import { useAppStore } from '@/stores/app';
import { useFormatters } from '@/composables/useFormatters';

const store = useAppStore();
const { formatList } = useFormatters();
</script>

<template>
  <ul class="grid gap-2 bg-gray-50 rounded-md border border-gray-200 p-4 m-4">
    <p>When any of the following record types is created, <strong>{{ formatList(store.selectedActions) }}</strong></p>
    <li v-for="(record, i) in store.selectedRecordTypes" :key="`${i}-${record}`">
      {{ record }}
    </li>
  </ul>
</template>