<script setup>
import Icon from '@/components/Icon.vue';

const props = defineProps({
  recordTypes: {
    type: Array,
    default: [],
    required: true,
  },
});
</script>

<template>
  <ul class="grid gap-2 p-4">
    <li
      v-for="(type, i) in props.recordTypes"
      :key="i"
      class="flex gap-2 items-center p-1 border border-gray-200 rounded-sm cursor-pointer"
      :class="{
        'bg-primary/10 border-2 border-primary': type.selected,
        'opacity-50 cursor-not-allowed': type.disabled
      }"
      @click="type.selected = !type.selected"
    >
      <Icon :name="type.icon" :size="16" :stroke-width="2" />
      <span>{{ type.title }}</span>
    </li>
  </ul>
</template>