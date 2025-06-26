import { defineStore } from 'pinia';
import { useSteps } from '@/composables/useSteps';

export const useAppStore = defineStore('app', {
  state: () => ({
    steps: useSteps().steps,
  }),
  actions: {
    setActiveStep(index) {
      this.steps[index].active = true;
      this.steps.forEach((step, i) => {
        if (i !== index) {
          step.active = false;
        }
      });
    },
    selectOption(index, optionIndex) {
      this.steps[index].options[optionIndex].selected = !this.steps[index].options[optionIndex].selected;
    },
    setCompleteStep(index) {
      this.steps[index].complete = true;
    },
    setInvalidStep(index) {
      this.steps[index].isValid = false;
    },
    setValidStep(index) {
      this.steps[index].isValid = true;
    },
    saveDraft() {
      // Create a workflow object with current data
      const workflow = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        recordTypes: this.selectedRecordTypes,
        actions: this.selectedActions,
        steps: JSON.parse(JSON.stringify(this.steps))
      };

      const existingWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
      existingWorkflows.push(workflow);
      localStorage.setItem('workflows', JSON.stringify(existingWorkflows));

      return workflow.id;
    }
  },
  getters: {
    activeStep: (state) => state.steps.find((step) => step.active),
    completeStep: (state) => state.steps.find((step) => step.complete),
    invalidStep: (state) => state.steps.find((step) => step.isValid === false),
    validStep: () => (stepToCheck) => stepToCheck.isValid === true,
    firstThreeStepsValid: (state) => state.steps.slice(0, 3).every((step) => step.isValid),
    isItemSelected: (state) => (index, optionIndex) => state.steps[index].options[optionIndex].selected,
    selectedActions: (state) => state.steps[2].options.filter((option) => option.selected).map(option => option.title),
    noRecordTypesSelected: (state) => state.steps[0].options[1].types.every((type) => !type.selected),
    selectedRecordTypes: (state) =>
      state.steps[0].options[1].types
        .filter(type => type.selected)
        .map(type => type.title),
    workflows: () => JSON.parse(localStorage.getItem('workflows') || '[]'),
  }
});