import { ref } from 'vue';
import { useStepOptions } from './useStepOptions';

export const useSteps = () => {
  const { action, criteria, trigger } = useStepOptions();

  const steps = ref([
    {
      title: 'Criteria',
      subtitle: 'What will this workflow be based on?',
      active: true,
      complete: false,
      isValid: false,
      options: criteria,
    },
    {
      title: 'Trigger',
      subtitle: 'What should trigger this workflow?',
      active: false,
      complete: false,
      isValid: false,
      options: trigger,
    },
    {
      title: 'Action',
      subtitle: 'What should trigger this workflow?',
      smallText: 'Select at least 1 action to continue. You can add additional actions later.',
      active: false,
      complete: false,
      isValid: false,
      options: action,
    },
    {
      title: 'Review',
      subtitle: 'Review your workflow below. Click a step to make edits if needed.',
      active: false,
      complete: false,
      isValid: false,
      options: [],
    },
  ]);

  return {
    steps
  }
}
