<template>
  <div>
    <nav>
      <h1>Blog App</h1>

      <div class="search-field">
        <i class="icon fas fa-search"></i>
        <input type="text" v-model="searchTerm" placeholder="Search Blog.." />
      </div>

      <div class="button-group">
        <button @click="openModal">Add Blog</button>
        <button>
          <NuxtLink to="/blog/savedBlogs"> Saved </NuxtLink>
        </button>
      </div>
    </nav>

    <div class="blog-list">
      <BlogCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        @deletePost="deletePost"
      />
    </div>

    <AddPostModal
      v-if="showModal"
      @closeModal="showModal = false"
      @savePost="addNewPost"
    />
  </div>
</template>

<script>
import BlogCard from "~/components/BlogCard.vue";
import AddPostModal from "~/components/AddPostModal.vue";
import { mapActions, mapState } from "vuex";

export default {
  async mounted() {
    await this.fetchPosts();
    await this.combinePosts();
  },
  computed: {
    ...mapState(["posts", "savedPosts"]),

    filteredPosts() {
      if (this.searchTerm.length >= 3) {
        return this.newArr.filter((post) =>
          post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        return this.newArr || this.posts;
      }
    },
  },
  methods: {
    ...mapActions(["fetchPosts", "addPost", "removePost"]),

    async addNewPost(newPost) {
      await this.addPost(newPost);
      await this.combinePosts();
      this.showModal = false;
    },
    async deletePost(postId) {
      await this.removePost(postId);
      await this.combinePosts();
    },
    openModal() {
      this.showModal = true;
    },
    combinePosts() {
      this.newArr = this.posts.map((post) => {
        const savedPost = this.savedPosts.find(
          (savedPost) => savedPost.id === post.id
        );
        return savedPost || post;
      });
    },
  },
  components: {
    BlogCard,
    AddPostModal,
  },
  data() {
    return {
      newArr: [],
      showModal: false,
      searchTerm: "",
    };
  },
};
</script>

<style>
@import "~/styles/index.css";
@import "~/styles/mobile.css";
</style>
