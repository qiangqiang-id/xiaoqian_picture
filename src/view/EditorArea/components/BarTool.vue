import { ref } from 'vue';
<template>
  <div class="tool-bar bar">
    <el-tooltip content="锁定图层" placement="top">
      <div class="ui-button ui-button--plain">
        <svg-icon class="svg-icon" name="lock" />
      </div>
    </el-tooltip>

    <!-- 图层工具栏 -->
    <!-- <el-popover
      v-model="isShowPopover"
      trigger="manual"
      placement="bottom"
      title="图层顺序"
      width="230"
    >
      <template #reference>
        <el-tooltip content="图层顺序" placement="top">
          <div class="ui-button ui-button--plain">
            <svg-icon name="layer" />
          </div>
        </el-tooltip>
      </template> -->

    <!-- <div class="layer-control">
        <div class="layer-btn">
          <svg-icon name="down-layer" />
        </div>
        <div class="layer-slider">
          <div class="layer-slider-wrap">
            <div class="layer-slider-line">
              <span
                v-for="(v, i) in computedLayerInfo"
                :key="i"
                class="layer-slider-step"
                :style="{ left: (v / 100) * 150 + 'px' }"
              />
            </div>
            <div
              class="layer-slider-button"
              :style="{ left: (computedBtnOpsition / 100) * 150 - 7 + 'px' }"
              @mousedown="sliderBtnMousedown"
            />
          </div>
        </div>
       
      </div> -->
    <!-- </el-popover> -->

    <!-- <el-tooltip content="图层顺序" placement="top">
      <div class="layer-btn">
        <svg-icon name="up-layer" />
      </div>
    </el-tooltip> -->

    <el-tooltip content="复制" placement="top">
      <div class="ui-button ui-button--plain">
        <svg-icon class="svg-icon" name="copy" />
      </div>
    </el-tooltip>

    <el-tooltip content="删除" placement="top">
      <div class="ui-button ui-button--plain">
        <svg-icon class="svg-icon" name="trash" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
// import { ref } from 'vue';

// const isShowPopover = ref(false);
</script>

<style lang="scss" scoped>
.tool-bar {
  justify-content: space-around;
  align-items: center;
}

.svg-icon {
  width: 15px;
  height: 15px;
}

// .layer-box {
//   width: 34px;
//   height: 34px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   .layer-icon {
//     font-size: 19px;
//   }
// }

// .lock {
//   color: red;
// }
// .locked {
//   color: #c7cbd0;
// }

// .layer-control {
//   display: flex;
//   justify-content: space-around;
//   align-content: center;
//   user-select: none;
//   .layer-btn {
//     height: 20px;
//     width: 20px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     cursor: pointer;
//   }
//   .layer-slider {
//     display: flex;
//     justify-content: center;
//     align-content: center;
//     flex-grow: 1;
//     .layer-slider-wrap {
//       position: relative;
//       .layer-slider-line {
//         display: inline-block;
//         position: relative;
//         border-radius: 15px;
//         width: 150px;
//         height: 2px;
//         background-color: #e6eaf2;
//         vertical-align: middle;
//         .layer-slider-step {
//           position: absolute;
//           top: 0px;
//           left: 0px;
//           height: 5px;
//           width: 1px;
//           background: #7f8792;
//           transform: translateY(-100%);
//         }
//       }
//       .layer-slider-button {
//         position: absolute;
//         top: 0;
//         left: -7px;
//         width: 14px;
//         height: 14px;
//         border-radius: 50%;
//         background: #fff;
//         box-shadow: 0 0 4px rgb(0 0 0 / 25%);
//         transform: translateY(4px);
//         cursor: pointer;
//       }
//     }
//   }
// }
</style>
