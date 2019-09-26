<template>
  <!-- 放置下部图片的组件 -->
  <div class="cover-img">
    <!-- 根据images的长度来决定上传图片的个数 -->
    <!-- images是从父组件publish传过来，通过props来接收的属性 -->
    <div @click="openLayer(index)" class="cover-item" v-for="(item,index) in images" :key="index">
      <img :src="item ? item : defaultImg" alt="">
    </div>
    <!-- 弹窗;当点击上传图片时，弹层出现，要给图片注册点击事件 -->
    <el-dialog @close="bool=false" :visible="bool">
      <!-- 新建一个select-img组件，放弹层里面的内容 -->
      <!-- 当子组件给父组件传值的时候，父组件要在子组件上监听 ，在方法中获取传过来的参数-->
      <select-img @transImg="secondImg"></select-img>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../../assets/img/pic_bg.png'),
      bool: false,
      selectIndex: -1
    }
  },
  methods: {
    secondImg (url) {
      // 索引值的获取，可将一个变量挂载data上，使用方法将其赋值为最新值，然后再作为参数，向上传
      // 本组件可获取点击图片的索引值，因此可以一起传给父组件publish，使其显示
      this.$emit('transImg', url, this.selectIndex)
      // 选完图片后，弹层要关闭
      this.bool = false
    },
    openLayer (index) {
      this.bool = true
      this.selectIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.cover-img {
  display: flex;
  margin: 10px 0;
  margin-left: 100px;
  .cover-item {
    height: 220px;
    width: 220px;
    padding: 10px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
