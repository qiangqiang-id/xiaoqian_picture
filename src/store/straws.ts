import { reactive, ref, Ref } from 'vue';
import { Straw } from '@/interface/straw';

// 模板中所有的straw
const straws: Array<Straw> = reactive([]);
//  moveable所有的straw
const targetStraws: Array<Straw> = reactive([]);
// 选中的straw
const selectedStraw: Ref<Straw | null> = ref(null);

function setSelectedStraw(straw: Straw | null) {
  selectedStraw.value = straw;
}

function addStraw(straw: Straw) {
  straws.push(straw);
}

function removeStraw(id: string) {
  const index = straws.findIndex((straw: Straw) => straw.id === id);
  if (index !== -1) {
    straws.splice(index, 1);
  }
}

function editStraw(id: string, editData: object) {
  const index = straws.findIndex((straw) => straw.id === id);
  if (index > -1) {
    Object.assign(straws[index], editData);
  }
}

function setTargetStraws(targets: Array<Straw>) {
  targetStraws.splice(0, targetStraws.length);
  targetStraws.push(...targets);
}

function useStraws() {
  return {
    straws,
    addStraw,
    removeStraw,
    editStraw,
    targetStraws: targetStraws,
    setTargetStraws,
    selectedStraw: selectedStraw,
    setSelectedStraw,
  };
}

export default useStraws;
