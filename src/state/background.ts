import { reactive, toRefs, readonly } from 'vue';

const backgroundInfo = reactive({
  color: '',
  image: '',
  opacity: 1,
});

function setBackgroundInfo(info: object) {
  Object.assign(backgroundInfo, info);
}

function useBackground() {
  return {
    ...toRefs(readonly(backgroundInfo)),
    setBackgroundInfo,
  };
}
export default useBackground;
