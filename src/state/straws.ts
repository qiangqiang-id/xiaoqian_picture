import { reactive, toRefs } from "vue";
import { strawText, strawImage } from "@/interface/straw";

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

const attrObj = reactive({
  straws,
  addStraw,
  remveStraw,
});

export default toRefs(attrObj);
