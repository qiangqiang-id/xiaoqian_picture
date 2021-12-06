import { reactive, ref, Ref } from 'vue';
import { strawText, strawImage, strawShape } from '@/interface/straw';

// 模板中所有的straw
const straws: Array<strawText | strawImage | strawShape> = reactive([]);

// movable选择的straw
const targetStraws: Array<strawText | strawImage | strawShape> = reactive([]);

const selectedStraw: Ref<strawText | strawImage | strawShape | null> = ref(null);

function setSelectedStraw(obj: strawText | strawImage | strawShape) {
  selectedStraw.value = obj;
}

function addStraw(straw: strawText | strawImage | strawShape) {
  straws.push(straw);
}

function removeStraw(id: string) {
  const index = straws.findIndex((straw: strawText | strawImage | strawShape) => straw.id === id);
  if (index !== -1) {
    straws.splice(index, 1);
  }
}

function editStraw(id: string, editData: object) {
  const straw = straws.find((straw) => straw.id === id);
  Object.assign(straw, editData);
}

function setTargetStraws(straw: strawText | strawImage | strawShape, isSingleSelect: boolean) {
  if (isSingleSelect) {
    targetStraws.splice(0, targetStraws.length - 1);
  }
  targetStraws.push(straw);
}

function useStraws() {
  return {
    straws,
    addStraw,
    removeStraw,
    editStraw,
    setTargetStraws,
    selectedStraw,
    setSelectedStraw,
  };
}

export default useStraws;
