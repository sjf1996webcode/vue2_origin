<template>
  <div class="com_header">
    <el-form :inline="true"  class="">
      <el-form-item label="查询条件1">
        <el-input v-model="user" placeholder="请输入查询条件1"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
   data() {
    return {
       
    };
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  methods: {
    submitForm() {
      
    },
  },
};
</script>

<style>
</style>