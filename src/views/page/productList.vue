<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit" :categoryList="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }">添加商品</router-link>
    </a-button>
    <!-- 表格 -->
    <product-table
      :data="tableData"
      :page="page"
      @change="tableChange"
      :categoryList="categoryList"
      @eidt="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>
<script>
import searchBox from '@/components/search.vue';
import productTable from '@/components/productTable.vue';
import categoryApi from '@/api/category';
import api from '@/api/product';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryList: [],
      categoryObj: {},
    };
  },
  components: {
    searchBox,
    productTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      // 同步，先执行获取类目的接口后，再执行获取表格数据的接口
      this.categoryList = res.data;
      this.categoryList.forEach((item) => {
        this.categoryObj[item.id] = item; // 把商品类目的名称储存在对象里
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      console.log(form); // 从子组件传过来的搜索值
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name, // 把商品类目名存进表格数据里
          }));
        });
    },
    tableChange(page) {
      // 从子组件传过来的页码信息值
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => (
          <div style="color:red;">
            {`确认删除产品标题为:${record.title}的商品吗？`}
          </div>
        ),
        onOk: () => { // 通过箭头函数改变this指向，要不然下面的this就不是指向vue了
          api
            .remove({
              id: record.id,
            })
            .then(() => {
              this.getTableData();
            });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>
<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>
