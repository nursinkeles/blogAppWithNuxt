<template>
  <div class="blog-card">
    <img src="/computer-image.jpg" alt="" />

    <h3>{{ updatedPost.title }}</h3>
    <p>{{ updatedPost.summary }}</p>

    <button>
      <router-link :to="`/blog/${updatedPost.id}`">
        READ MORE
        <i class="fa-solid fa-angles-right"></i>
      </router-link>
    </button>

    <div class="card-footer">
      <span>{{ updatedPost.publication_date }}</span>

      <small>4 min read</small
      ><i
        :class="[
          { 'fa-solid fa-bookmark': isPostSaved(updatedPost.id) },
          { 'fa-regular fa-bookmark': !isPostSaved(updatedPost.id) },
        ]"
        @click="toggleSaved(updatedPost.id)"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(["savedPosts", "posts"]),

    updatedPost() {
      const savedPost = this.savedPosts.find(
        (post) => post.id === this.post.id
      );
      console.log("a", savedPost);
      return savedPost || this.post;
    },
  },
  methods: {
    ...mapActions(["toggleSaved"]),
    isPostSaved(postId) {
      const post = this.posts.find((post) => post.id === postId);
      return post && post.saved;
    },
  },
};
</script>

<style scoped>
@import "~/styles/card.css";
</style>
