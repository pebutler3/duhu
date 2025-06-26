<script setup>
import { ref } from 'vue';
import Icon from '@/components/Icon.vue'
import RecordTypes from '@/components/RecordTypes.vue';
import ReviewList from '@/components/ReviewList.vue';
import Stepper from '@/components/Stepper.vue';
import { useApp } from '@/composables/useApp';
import { useAppStore } from '@/stores/app';

const { steps } = useApp();
const store = useAppStore();
const activeStepIndex = ref(0);
const showRecordTypes = ref(false);

const setStep = (index) => {
  store.setActiveStep(index);
  activeStepIndex.value = index;
}


const nextStep = () => {
  if (activeStepIndex.value === 0 && !showRecordTypes.value) {
    showRecordTypes.value = true;
    return;
  }

  if (activeStepIndex.value < store.steps.length - 1) {
    store.steps[activeStepIndex.value].active = false;
    store.steps[activeStepIndex.value].complete = true;
    showRecordTypes.value = false;
    activeStepIndex.value++;
    store.steps[activeStepIndex.value].active = true;
  }
};

const prevStep = () => {
  if (showRecordTypes.value) {
    showRecordTypes.value = false;
    return;
  }

  if (activeStepIndex.value > 0) {
    store.steps[activeStepIndex.value].active = false;
    store.steps[activeStepIndex.value].complete = false;
    activeStepIndex.value--;
    store.steps[activeStepIndex.value].active = true;
  }
};

const selectAllRecordTypes = () => {
  const allSelected = store.steps[0].options[1].types.every(type => type.selected);

  store.steps[0].options[1].types.forEach(type => {
    type.selected = !allSelected;
  });
};

const saveDraft = () => {
  store.saveDraft();
  window.location.reload();
};
</script>

<template>
  <main class="grid">
    <div class="max-w-lg p-4 m-10 bg-white rounded-md border border-gray-200">
      <h1 class="px-4">New Workflow</h1>
      <Stepper :steps="store.steps" @next="setStep($event)" />
      <div class="px-4" v-if="!showRecordTypes">
        <p>{{ store.steps[activeStepIndex].subtitle }}</p>
        <small>{{ store.steps[activeStepIndex].smallText }}</small>
      </div>
      <div v-else>
        <div class="px-4">
          <p>Which record types should be included?</p>
        </div>
      </div>
      <template v-if="showRecordTypes">
        <RecordTypes :recordTypes="store.steps[0].options[1].types" />
        <div class="px-4 mb-2">
          <button
            class="flex items-center gap-2"
            @click="selectAllRecordTypes"
          >
            <div
              class="w-6 h-6 flex items-center justify-center border-2 border-primary rounded text-white"
              :class="[
                store.steps[0].options[1].types.every((type) => type.selected)
                ? 'bg-primary'
                : 'bg-white'
              ]"
            >
              <Icon name="Check" :size="16" :stroke-width="2.5" />
            </div>
            <span>Select all</span>
          </button>
        </div>
      </template>
      <ul class="grid gap-2 p-4" v-else-if="steps[activeStepIndex].options.length > 0">
        <template v-for="(step, stepIndex) in steps" :key="stepIndex">
          <template v-if="step.active">
            <li
              class="flex gap-2 items-center p-1 border border-gray-200 rounded-sm cursor-pointer"
              :class="{
                'bg-primary/10 border-2 border-primary': store.isItemSelected(stepIndex, i),
                'opacity-50 cursor-not-allowed': item.disabled
              }"
              v-for="(item, i) in step.options"
              :key="`${stepIndex}-${i}-${item}`"
              @click="item.disabled ? null : store.selectOption(stepIndex, i)"
            >
              <Icon :name="item.icon" :size="16" :stroke-width="2" />
              <span>{{ item.title }}</span>
            </li>
          </template>
        </template>
      </ul>
      <ReviewList v-else />
      <div class="border-t border-gray-200 py-2 -mx-4">
        <div class="flex justify-between px-8">
          <button
            class="flex gap-2 items-center text-primary underline cursor-pointer"
            @click="prevStep"
            v-if="activeStepIndex > 0 || showRecordTypes"
          >
            <Icon name="ArrowLeft" :size="14" :stroke-width="2" />
            Back
          </button>
          <div class="ml-auto">
            <button
              class="text-primary px-4 py-2 cursor-pointer hover:underline"
              v-if="activeStepIndex > 0"
              @click="saveDraft"
            >
              Save and Finish Later
            </button>
            <button
              class="bg-primary disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-sm ml-auto"
              @click="nextStep"
              :disabled="!store.validStep(store.activeStep) || (showRecordTypes && store.noRecordTypesSelected)"
              v-if="activeStepIndex < steps.length - 1"
            >
              Next
            </button>
            <button
              class="bg-primary disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer text-white px-4 py-2 rounded-sm"
              @click="saveDraft"
              :disabled="!store.firstThreeStepsValid"
              v-else
            >
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="px-10" v-if="store.workflows.length > 0">
      <h2 class="text-lg font-semibold mb-4">Workflow Drafts</h2>
      <ul class="grid gap-4">
        <li class="border rounded-xl p-4 hover:shadow-md transition-shadow" v-for="workflow in store.workflows" :key="workflow.id">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-medium">Workflow #{{ workflow.id.toString().slice(-4) }}</h3>
              <p class="text-sm text-gray-600">
                Record Types: {{ workflow.recordTypes.join(', ') || 'None' }}
              </p>
            </div>
            <small class="text-gray-500">{{ new Date(workflow.createdAt).toLocaleString() }}</small>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>
