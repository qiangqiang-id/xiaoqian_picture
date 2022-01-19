import { reactive, toRefs } from 'vue';

const state = reactive({
  visible: false,
  color: '',
  id: null,
});

const useSucker = () => {
  return {
    ...toRefs(state),
  };
};

export default useSucker;
