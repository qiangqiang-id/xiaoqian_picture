import { reactive, toRefs } from "vue";

interface BackgroundInfo {
  color?: string;
  image?: string;
  opacity?: number;
}
const backgroundInfo: BackgroundInfo = reactive({
  color: "",
  image: "",
  opacity: 1,
});

function setBackgroundInfo(info: BackgroundInfo) {
  Object.assign(backgroundInfo, info);
}

const attrObj = reactive({
  backgroundInfo,
  setBackgroundInfo,
});
export default toRefs(attrObj);
