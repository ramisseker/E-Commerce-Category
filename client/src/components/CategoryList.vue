<template>
  <div class="columns ">
    <section class="column">
      <div>
        <div class="columns is-justify-content-space-between m-2">
          <div>
            <h1>Categories</h1>
          </div>
          <div>
            <input
              class="mr-3"
              type="text"
              placeholder="Category Name"
              v-model="categoryName"
            />
            <button>Edit</button>
            <button>Delete</button>
            <button @click="saveCategory">Add</button>
          </div>
        </div>
        <div class="categories">
          <ul>
            <li
              class="listitems is-12"
              v-for="item in items"
              :key="item.id"
              @click="subCategoriesById(item.id)"
            >
              {{ item.category_name }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="column">
      <div>
        <div class="columns is-justify-content-space-between m-2">
          <div>
            <h1>SubCategories</h1>
          </div>
          <div>
            <input
              class="mr-3"
              type="text"
              placeholder="Sub Category Name"
              v-model="subCategoryName"
            />
            <button>Edit</button>
            <button>Delete</button>
            <button v-on:click="saveSubCategory">
              Add
            </button>
          </div>
        </div>
        <div class="categories">
          <ul>
            <li class="listitems is-12" v-for="item in subItems" :key="item.id">
              {{ item.subcatname }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="column">
      <div>
        <div class="columns is-justify-content-space-between m-2">
          <div>
            <h1>Categories</h1>
          </div>
          <div>
            <button>Edit</button>
            <button>Delete</button>
            <button>Add</button>
          </div>
        </div>
        <div class="categories">
          <ul id="example-1">
            <li
              class="listitems is-12"
              v-for="item in items"
              :key="item.message"
              @click="basildi"
            >
              {{ item.message }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="column">
      <div>
        <div class="columns is-justify-content-space-between m-2">
          <div>
            <h1>Categories</h1>
          </div>
          <div>
            <button>Edit</button>
            <button>Delete</button>
            <button>Add</button>
          </div>
        </div>
        <div class="categories">
          <ul id="example-1">
            <li
              class="listitems is-12"
              v-for="item in items"
              :key="item.message"
              @click="basildi"
            >
              {{ item.message }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<!-- <router-link :to="{ name: 'Create' }" class="button is-success mt-5"
      >Add New</router-link
    > -->
<!-- <table class="table is-striped is-bordered mt-2 is-fullwidth">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th class="has-text-centered">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.product_id">
          <td>{{ item.product_name }}</td>
          <td>{{ item.product_price }}</td>
          <td class="has-text-centered">
            <router-link
              :to="{ name: 'Edit', params: { id: item.product_id } }"
              class="button is-info is-small"
              >Edit</router-link
            >
            <a
              class="button is-danger is-small"
              @click="deleteProduct(item.product_id)"
              >Delete</a
            >
          </td>
        </tr>
      </tbody>
    </table> -->

<script>
// import axios
import axios from 'axios';

export default {
  name: 'CategoryList',
  data() {
    return {
      displayCategory: false,
      categoryName: '',
      subCategoryName: '',
      category_id: '',
      items: [],
      subItems: [],
    };
  },

  created() {
    this.getCategory();
  },

  methods: {
    async getCategory() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/categories'
        );
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async saveCategory() {
      try {
        await axios.post('http://localhost:3000/api/categories', {
          category_name: this.categoryName,
        });
        this.categoryName = '';
        this.$router.push('/');
        alert('item eklendi.');
      } catch (err) {
        console.log(err);
      }
    },
    async subCategoriesById(id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/subcategories/${id}`
        );
        this.subItems = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async saveSubCategory() {
      try {
        await axios.post('http://localhost:3000/api/subcategories', {
          subcatname: this.subCategoryName,
          category_id: this.subItems[0].category_id,
        });

        this.subCategoryName = '';
        this.category_id = '';
        this.$router.push('/');
        alert('item eklendi.');
      } catch (err) {
        console.log(err);
      }
    },

    // async getSubCategoryById() {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:5000/categories/${id}`
    //     );
    //     this.items = response.data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    // Delete Product
    async deleteCategory(id) {
      try {
        await axios.delete(`http://localhost:3000/categories/${id}`);
        this.getCategory();
      } catch (err) {
        console.log(err);
      }
    },
    basildi() {
      alert('basıldı...');
    },
    visibility() {},
  },
};
</script>

<style scoped>
.categories {
  height: 20rem;
  border: 1px solid #000000;
}
.listitems {
  border: 1px solid #000000;
}

.nav p {
  display: none;
}
</style>
