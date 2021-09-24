<template>
  <div v-if="fetchData" class="columns ">
    <component
      v-for="(component, index) in components"
      :key="index"
      :is="component"
      @Clicked="getCategoryById"
      :items="items[index]"
      :categoryId="categoryIdList[index].category_id"
      :boxId="index"
    ></component
    >"
  </div>
</template>
<script>
import Category from '../components/Category.vue';
import axios from 'axios';

export default {
  name: 'CategoryList',
  components: {
    Category,
  },
  data() {
    return {
      fetchData: false,
      categoryIdList: [{ boxId: 0, category_id: null }],
      items: [{ category_name: 'Category Ekleyiniz' }],
      components: [Category],
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      try {
        const response = await axios.get('http://localhost:3000/api/category');
        this.items[0] = response.data;
        this.fetchData = true;
      } catch (err) {
        console.log(err);
      }
    },
    async getCategoryById(id, boxId) {
      console.log(this.items[boxId + 1]);
      if (this.items[boxId + 1] == undefined) {
        this.items[boxId + 1] = [];
      }
      this.categoryIdList.push({ boxId: boxId, category_id: id });
      console.log(id, boxId);
      if (this.categoryIdList.filter((x) => x.boxId == boxId).length > 0) {
        const a = this.categoryIdList.findIndex((a) => a.boxId == boxId);
        this.categoryIdList[a] = {
          boxId: boxId,
          category_id: id,
        };
      } else {
        this.categoryIdList.push({ boxId: boxId, category_id: id });
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/api/category/${id}`
        );
        console.log(response.data);
        if (this.components.length == boxId + 1) {
          this.components.push(Category);
        }
        this.items[boxId + 1] = response.data;
        this.items = [...this.items];
      } catch (err) {
        console.log(err);
      }
      console.log('items', this.items);
    },
  },
};
</script>

<style scoped></style>
