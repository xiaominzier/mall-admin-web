<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="handleTableChange"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="editProduct(record)">编辑</a-button>
      <a-button @click="deleteProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['data', 'page'],
  computed: {
    // 因为ant-design表格特性，要手动给表格数据增加一个不重复的key值
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    handleTableChange(page) {
      // 点击分页时向父组件传递当前页码信息
      this.$emit('change', page);
    },
    editProduct(record) {
      // this.$router.push({
      //   name: "ProductEdit",
      //   params: {
      //     id: record.id,
      //   },
      // });
      this.$emit('edit', record); // 把具体的操作放到父组件里
    },
    deleteProduct(record) {
      // this.$confirm({
      //   title: "确认删除",
      //   content: () => (
      //     <div style="color:red;">
      //       {"确认删除产品标题为:" + record.title + "的商品吗？"}
      //     </div>
      //   ),
      //   onOk() {
      //     api
      //       .remove({
      //         id: record.id,
      //       })
      //       .then((res) => {
      //         console.log(res);
      //       });
      //   },
      //   onCancel() {
      //     console.log("Cancel");
      //   },
      //   class: "confirm-box",
      // });
      this.$emit('remove', record);
    },
  },
};
</script>
