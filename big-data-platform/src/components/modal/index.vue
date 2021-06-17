<template>
  <transition name="fade">
  <div class="modal-wrap" v-if="visible">
    <div class="modal" :style="{width:width}">
      <div class="hd">
        {{title}}
        <span class="btn-close" @click="close">x</span>
      </div>
      <div class="bd">
        <slot name="content"></slot>
      </div>
      <slot name="ft">
        <!--<div class="ft" slot="ft">
          <a href="javscript:void(0)" class="btn make-sure" @click="sure">确定</a>
          <a href="javscript:void(0)" class="btn cancel" @click="close">取消</a>
        </div>-->
      </slot>
    </div>
    <div class="backdrop" @click="close"></div>
  </div>
  </transition>
</template>

<script>
  export default {
    name: "MyModal",
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true,
      },
      title: {
        type: String,
        default: '',
      },
      width: {
        type: String,
        default: '50vw',
      }
    },
    methods: {
      close() {
        this.$emit('update:visible', false)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    z-index: 99999999;
    border-radius: 5px;
    .hd {
      padding:15px 15px 15px;
      font-size: 15px;
      color:#333;
      // background-color: #1B6398;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f0f0f0;
      .btn-close {
        font-size: 18px;
        position: relative;
        right:5px;
        cursor: pointer;
        font-weight: 600;
      }
    }
    .bd {
      // padding:10px;
    }
  }
  .backdrop {
    position: fixed;
    top:0;
    left:0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 99999998;
  }
</style>