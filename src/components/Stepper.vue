<script setup>
const emits = defineEmits(['next']);

const props = defineProps({
  steps: {
    type: Array,
    default: [],
    required: true,
  },
});

const incomplete = 'bg-gray-100 border-2 border-gray-300 text-gray-500 font-semibold flex items-center justify-center transition-transform z-50';
const active = 'bg-white border-2 border-gray-300 text-white font-semibold flex items-center justify-center transition-transform shadow-lg shadow-blue-500/25 z-50';
const complete = 'bg-primary-green border-2 border-primary-green text-white font-semibold flex items-center justify-center hover:scale-105 transition-transform z-50 cursor-pointer';

const getStepClass = (isComplete, isActive) => {
  if (isComplete) {
    return complete;
  } else if (isActive) {
    return active;
  } else {
    return incomplete;
  }
};
</script>

<template>
<div class="flex items-center justify-between py-4 -mx-4">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="flex flex-col items-center relative flex-1"
      :class="{ 'flex-1': true, 'last-step': index === steps.length - 1 }"
    >
      <!-- only clickable if step is valid -->
      <button class="w-10 h-10 rounded-full" :class="getStepClass(step.complete, step.active)" @click="emits('next', index)" :disabled="!step.isValid">
        <template v-if="step.complete">✓</template>
      </button>
      <span class="text-sm text-gray-600 mt-2">{{ step.title }}</span>
      <div
        v-if="index < steps.length - 1"
        class="absolute top-5 left-1/2 w-full h-0.5 bg-gray-300 z-10"
      ></div>
    </div>
  </div>
</template>
