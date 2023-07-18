<template>
  <div class="modal" v-if="showModal">
    <div class="modal-container">
      <div class="close-button" @click="closeModal">
        <i class="fa-sharp fa-solid fa-xmark"></i>
      </div>

      <div class="content">
        <h2>Add New Post</h2>
        <form @submit.prevent="savePost">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="title" required />
          </div>
          <div class="form-group">
            <label for="summary">Summary</label>
            <textarea id="summary" v-model="summary" required />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" v-model="content" required />
          </div>
          <button type="submit" :disabled="isInvalidForm">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
      title: "",
      summary: "",
      content: "",
    };
  },
  methods: {
    savePost() {
      const newPost = {
        id: this.$store.getters.getNextId,
        title: this.title,
        summary: this.summary,
        content: this.content,
        publication_date: this.getCurrentDate(),
        saved: false,
      };
      this.$emit("savePost", newPost);
      this.closeModal();
    },

    closeModal() {
      this.showModal = false;
      this.title = "";
      this.summary = "";
      this.content = "";
    },
    getCurrentDate() {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      return `${day}-${month}-${year}`;
    },
  },
  computed: {
    isInvalidForm() {
      return (
        this.title.trim() === "" ||
        this.summary.trim() === "" ||
        this.content.trim() === ""
      );
    },
  },
  props: ["posts"],
};
</script>

<style scoped>
@import "~/styles/modal.css";
</style>
