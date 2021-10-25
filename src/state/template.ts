import { reactive, toRefs, readonly } from 'vue';

const templateInfo = reactive({
  width: 500,
  height: 500,
  scale: 1,
  overflow: 'visible',
});

function setTemplateInfo(info: object) {
  Object.assign(templateInfo, info);
}

function useTemplate() {
  return {
    ...toRefs(readonly(templateInfo)),
    setTemplateInfo,
  };
}

export default useTemplate;
