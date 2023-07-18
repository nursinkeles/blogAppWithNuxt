const state = () => ({
  posts: [],
  savedPosts: [],
});

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  addPost(state, post) {
    state.posts.push(post);
  },
  removePost(state, postId) {
    state.posts = state.posts.filter((post) => post.id !== postId);
    state.savedPosts = state.savedPosts.filter((post) => post.id !== postId);
  },
  updatePost(state, updatedPost) {
    const index = state.posts.findIndex((post) => post.id === updatedPost.id);
    if (index !== -1) {
      state.posts.splice(index, 1, updatedPost);
    }

    const savedIndex = state.savedPosts.findIndex(
      (post) => post.id === updatedPost.id
    );
    if (savedIndex !== -1) {
      state.savedPosts.splice(savedIndex, 1, updatedPost);
    }
  },
  updateSavedPosts(state, updatedPost) {
    const index = state.savedPosts.findIndex(
      (post) => post.id === updatedPost.id
    );
    if (index !== -1) {
      state.savedPosts.splice(index, 1, updatedPost);
    } else if (updatedPost.saved) {
      state.savedPosts.push(updatedPost);
    }
    state.savedPosts = [...state.savedPosts];
  },
  toggleSaved(state, postId) {
    const post = state.posts.find((p) => p.id === postId);
    if (post) {
      post.saved = !post.saved;
    }
  },

  removeSavedPost(state, postId) {
    state.savedPosts = state.savedPosts.filter((post) => post.id !== postId);
  },
};

import axios from "axios";
const actions = {
  async fetchPosts({ commit }) {
    try {
      const { data } = await axios.get("/articles.json");
      commit("setPosts", data.articles);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },

  async addPost({ commit, getters }, post) {
    const newPost = {
      id: getters.getNextId,
      ...post,
    };
    commit("addPost", newPost);
  },

  async removePost({ commit }, postId) {
    commit("removePost", postId);
  },

  async updatePostAction({ commit }, updatedPost) {
    console.log("updatePostAction", updatedPost);
    commit("updatePost", updatedPost);
  },

  async toggleSaved({ commit, state }, postId) {
    const post = state.posts.find((p) => p.id === postId);
    if (post) {
      const updatedPost = { ...post, saved: !post.saved };
      commit("updatePost", updatedPost);

      if (updatedPost.saved) {
        commit("updateSavedPosts", updatedPost);
      } else {
        commit("removeSavedPost", updatedPost.id);
      }
    }
  },
};

const getters = {
  getNextId: (state) => {
    return state.posts.length + 1;
  },
  savedPosts: (state) => {
    return [...state.savedPosts];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
