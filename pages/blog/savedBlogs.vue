<template>
  <div>
    <div class="title">
      <h2>Saved Blogs</h2>
    </div>
    <div class="blog-list">
      <BlogCard
        v-for="post in savedPosts"
        :key="post.id"
        :post="post"
        @deletePost="deleteSavedPost(post.id)"
      />
    </div>
  </div>
</template>

<script>
import BlogCard from "~/components/BlogCard.vue";
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["posts"]),
    savedPosts() {
      return this.posts.filter((post) => post.saved);
    },
  },
  methods: {
    ...mapActions(["deleteSavedPost"]),
  },
  components: {
    BlogCard,
  },
};
</script>

<style>
@import "~/styles/index.css";
</style>
