<template>
<el-container>
    <el-aside style="width:200px;background-color:#323745" >
        <layside></layside>
    </el-aside>
    <el-container>
        <el-header>
          <layheader></layheader>
        </el-header>
        <el-main style="padding:0px;overflow:hidden;">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>
<script>
export default {
}
</script>

<style>

</style>
