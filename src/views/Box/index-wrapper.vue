<template>
<div class="wh100">
      <transition name="fadeApp">
    <router-view></router-view>
      </transition>
</div>
</template>
<style>
.fadeApp-enter-active {
  transition: all .8s linear
}
.fadeApp-leave-active {
  transition: all .3s linear
}
.fadeApp-enter,
.fadeApp-leave-to {
  opacity: 0;
  filter: grayscale(1)
}

.fadeApp-enter-to,
.fadeApp-leave {
  opacity: 1;
}
</style>