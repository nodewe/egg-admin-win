<!-- 接口文档 -->
<template>
  <div class="app-container">
    <iframe
      src="https://apifox.com/apidoc/shared-1def4193-8e3e-4cde-9ed1-92faf42b3db6"
      width="100%"
      height="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;

  /* 84 = navbar + tags-view = 50 + 34 */
  height: calc(100vh - 50px);
}

.hasTagsView {
  .app-container {
    height: calc(100vh - 84px);
  }
}
</style>
