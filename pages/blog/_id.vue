<template>
  <div class="detail-page">
    <NuxtLink to="/" class="back-icon">
      <i class="fa-solid fa-backward"></i>
    </NuxtLink>
    <div class="container">
      <img src="/computer-image.jpg" alt="" />
      <div class="content">
        <h1>{{ isSaving ? updatedTitle : title }}</h1>

        <p>
          <b>{{ isSaving ? "Edited Date:" : "Publication Date" }}</b>
          {{ isSaving ? getCurrentDate() : formatDate(publication_date) }}
        </p>

        <p>{{ isSaving ? updatedSummary : summary }}</p>
      </div>
    </div>
    <div class="sub-container">
      <h1>CONTENT</h1>
      <p>{{ isSaving ? updatedContent : content }}</p>
    </div>

    <div v-if="isEditing" class="sub-container edit-form">
      <div class="form-group">
        <label for="updated-title">Update Title</label>
        <input type="text" id="updated-title" v-model="updatedTitle" required />
      </div>
      <div class="form-group">
        <label for="updated-summary">Update Summary</label>
        <textarea
          id="updated-summary"
          v-model="updatedSummary"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="updated-content">Update Content</label>
        <textarea
          id="updated-content"
          v-model="updatedContent"
          required
        ></textarea>
      </div>
    </div>
    <div v-if="!isEditing" class="bottom-container">
      <button @click="openEditMode">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button @click="deletePost"><i class="fa-solid fa-trash"></i></button>
      <button><i class="fa-solid fa-share-nodes"></i></button>
      <button @click="toggleSaved(id)">
        <i
          :class="[
            { 'fa-solid fa-bookmark': isPostSaved },
            { 'fa-regular fa-bookmark': !isPostSaved },
          ]"
        ></i>
      </button>
    </div>
    <div v-if="isEditing" class="bottom-container save-btn">
      <button @click="updatePost">
        <i class="fa-solid fa-floppy-disk"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["posts", "savedPosts"]),
    isPostSaved() {
      const savedPost = this.savedPosts.find((post) => post.id === this.id);
      return savedPost && savedPost.saved;
    },
  },
  async asyncData({ params, store }) {
    const postId = params.id;
    await store.dispatch("fetchPosts");
    const post = store.state.posts.find((p) => p.id === postId.toString());
    const { id, title, summary, content, saved, publication_date } = post;
    return { id, title, summary, content, saved, publication_date };
  },
  methods: {
    ...mapActions([
      "updatePost",
      "deletePost",
      "toggleSaved",
      "removePost",
      "updatePostAction",
    ]),
    openEditMode() {
      this.isEditing = true;
      this.updatedTitle = this.title;
      this.updatedSummary = this.summary;
      this.updatedContent = this.content;
    },

    async updatePost() {
      const updatedPost = {
        id: this.id,
        title: this.updatedTitle,
        summary: this.updatedSummary,
        content: this.updatedContent,
        publication_date: this.getCurrentDate(),
        saved: this.saved,
      };
      await this.$store.dispatch("updatePostAction", updatedPost);
      // await this.updatePost(updatedPost);

      this.isEditing = false;
      this.isSaving = true;
    },
    async deletePost() {
      this.removePost(this.id);
      this.$router.push("/");
    },

    getCurrentDate() {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      return `${day}-${month}-${year}`;
    },
    formatDate(date) {
      const [day, month, year] = date.split("-");
      return `${day}-${month}-${year}`;
    },
  },
  data() {
    return {
      isSaving: false,
      isEditing: false,
      updatedTitle: "",
      updatedSummary: "",
      updatedContent: "",
    };
  },
};
</script>
<style>
@import "~/styles/detailPage.css";
</style>
