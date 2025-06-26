import { watch } from 'vue';
import { useAppStore } from '@/stores/app';

export const useApp = () => {
  const store = useAppStore();

  const isStepValid = (step) => {
    if (step.options) {
      const selections = step.options.filter((item) => item.selected);
      return selections.length > 0;
    }
    return true;
  }

  watch(store.steps, () => {
    store.steps.forEach((step, index) => {
      if (isStepValid(step)) {
        store.setValidStep(index);
      } else {
        store.setInvalidStep(index);
      }
    })
  }, { deep: true })


  return {
    isStepValid,
    steps: store.steps,
  }
}
