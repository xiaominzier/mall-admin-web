<template>
  <div class="basic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
    >
      <a-form-model-item ref="name" label="标题" required prop="title">
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品类别"
          @change="changeCategory"
        >
          <a-select-option
            :value="c.id"
            v-for="c in categoryList"
            :key="c.id"
            >{{ c.name }}</a-select-option
          >
        </a-select>
        <a-select v-model="form.c_item" placeholder="请选择子商品类别">
          <a-select-option :value="c" v-for="c in categoryItems" :key="c">{{
            c
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" required prop="tags">
        <a-select
          mode="tags"
          placeholder="Please select"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">
            包邮，最晚次日达
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" class="next-btn" :wrapperCol="{ span: 24 }">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      // form: {  把这些数据放入父组件中
      //   title: "",
      //   desc: "",
      //   category: "",
      //   s_items: [],
      //   tags: "",
      // },
      categoryList: [],
      categoryItems: [],
      rules: {},
    };
  },
  props: ['form'],
  created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form); // 将表单值传给父组件
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>
<style lang="less">
.next-btn {
  text-align: center;
}
</style>
