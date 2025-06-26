import { ref } from 'vue';

export const useStepOptions = () => {
  const recordTypes = ref([
    {
      title: 'Password',
      icon: 'KeyRound',
      selected: false,
    },
    {
      title: 'Company KB article',
      icon: 'BookText',
      selected: false,
    },
    {
      title: 'Central KB article',
      icon: 'BookText',
      selected: false,
    },
    {
      title: 'Process',
      icon: 'CheckSquare',
      selected: false,
    },
    {
      title: 'Website',
      icon: 'Globe',
      selected: false,
    },
    {
      title: 'Rack',
      icon: 'Layers',
      selected: false,
    },
    {
      title: 'Network',
      icon: 'Network',
      selected: false,
    },
    {
      title: 'Asset',
      icon: 'Circle',
      selected: false,
    }
  ]);

  const criteria = ref([
    {
      title: 'Company',
      icon: 'House',
      selected: false,
      disabled: true
    },
    {
      title: 'Record',
      icon: 'BookText',
      selected: false,
      types: recordTypes.value
    },
    {
      title: 'Website',
      icon: 'Globe',
      selected: false,
      disabled: true
    },
    {
      title: 'Expiration',
      icon: 'Calendar',
      selected: false,
      disabled: true
    },
    {
      title: 'User',
      icon: 'User',
      selected: false,
      disabled: true
    },
    {
      title: 'Group',
      icon: 'Users',
      selected: false,
      disabled: true
    },
    {
      title: 'Integration',
      icon: 'Plug',
      selected: false,
      disabled: true
    },
  ]);

  const trigger = ref([
    {
      title: 'Record created',
      icon: 'Plus',
      selected: false,
    },
    {
      title: 'Record updated',
      icon: 'SquarePen',
      selected: false,
    }
  ]);

  const action = ref([
    {
      title: 'Add flag',
      icon: 'Flag',
      selected: false,
    },
    {
      title: 'Send email',
      icon: 'Mail',
      selected: false,
    },
    {
      title: 'Send webhook',
      icon: 'Webhook',
      selected: false,
    },
  ]);

  return {
    action,
    criteria,
    recordTypes,
    trigger,
  }
}