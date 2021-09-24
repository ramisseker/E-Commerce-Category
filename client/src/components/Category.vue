<template>
  <section class="category columns is-one-quarter mx-2">
    <div>
      <div class="column is-justify-content-space-between ">
        <div>
          <h1>Categories</h1>
        </div>
        <div>
          <input
            class="mr-3"
            type="text"
            :placeholder="items.category_name"
            v-model="categoryName"
          />
          <button
            class="button is-warning is-small"
            @click="updateCategory(itemId)"
          >
            Edit
          </button>

          <button class="button is-danger is-small" @click="deleteCategory">
            Delete
          </button>
          <button
            class="button is-info is-small"
            @click="saveCategory(categoryId)"
          >
            Add
          </button>
        </div>
      </div>
      <div class="categories">
        <ul>
          <li
            class="listitems is-12"
            v-for="(item, index) in items"
            :key="index"
            @click="clickId(item.id, boxId)"
          >
            {{ item.category_name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  props: ['items', 'categoryId', 'boxId'],
  name: 'Category',

  data() {
    return {
      itemId: '',
      categoryName: '',
      category_id: '',
      scrollPosition: null,
    };
  },

  methods: {
    clickId(id, boxId) {
      console.log('this.categoryId', this.categoryId);
      this.itemId = id;
      this.$emit('Clicked', id, boxId);
    },
    async saveCategory(id) {
      try {
        await axios.post('http://localhost:3000/api/category/', {
          category_name: this.categoryName,
          category_id: id,
        });
        console.log(id);
        this.categoryName = '';
        this.$router.go('/');
      } catch (err) {
        console.log(err);
      }
    },
    async updateCategory(id) {
      try {
        await axios.put(`http://localhost:3000/api/category/${id}`, {
          category_name: this.categoryName,
        });
        this.categoryName = '';
        this.$router.go('/');
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCategory() {
      try {
        await axios.delete(`http://localhost:3000/api/category/${this.itemId}`);
        this.$router.go('/');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.categories {
  min-height: 20rem;
  max-height: 30rem;
  border: 2px solid #000000;
}

.listitems {
  border-bottom: 2px solid #000000;
}
</style>
