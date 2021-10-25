import { reactive } from 'vue';
import { strawText, strawImage } from '@/interface/straw';

const straws: Array<strawText | strawImage> = reactive([]);

function addStraw(straw: strawText | strawImage) {
  straws.push(straw);
}

function remveStraw(id: string) {
  const index = straws.findIndex((straw: strawText | strawImage) => straw.id === id);
  if (index !== -1) {
    straws.splice(index, 1);
  }
}

function useStraws() {
  return {
    straws,
    addStraw,
    remveStraw,
  };
}

export default useStraws;
