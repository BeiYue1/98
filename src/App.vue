<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
    <!-- <router-view/> -->
  </div>
</template>

<style lang="less">

</style>
