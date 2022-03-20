<template>
  <div class="panel-container">
    <ul>
      <li
        class="list-item"
        @click="handleClick(panel.value)"
        v-for="panel in panelList"
        :key="panel.value"
      >
        <img
          class="list-item-icon"
          :src="selectedIcon === panel.value ? panel.iconhover : panel.icon"
          alt=""
        />
        <span class="text"> {{ panel.name }}</span>
      </li>
    </ul>

    <component class="component" :is="selectedIcon" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import panelList from './panelMap';
import Image from './components/image.vue';
import Background from './components/background.vue';
import Shape from './components/shape.vue';
import Text from './components/text.vue';

export default defineComponent({
  name: 'Panel',

  components: {
    Image,
    Background,
    Shape,
    Text,
  },

  setup() {
    const selectedIcon = ref(panelList[0].value);

    function handleClick(value: string) {
      selectedIcon.value = value;
    }

    return { panelList, selectedIcon, handleClick };
  },
});
</script>

<style lang="scss" scoped>
.panel-container {
  width: 350px;
  display: flex;
}

.list-item {
  margin: 7px;
  margin-top: 14px;
  height: 56px;
  width: 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background: rgba(236, 240, 245, 0.8);
    border-radius: 8px;
  }
  .list-item-icon {
    width: 25px;
  }

  .text {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    color: rgba(18, 19, 63, 0.8);
  }
}

.component {
  width: 100%;
  padding: 20px;
}
</style>
