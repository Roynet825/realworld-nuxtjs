<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        class="author"
        >{{ article.author.username }}</nuxt-link
      >
      <span class="date">{{ article.createAt | date("MMMM DD, YYYY") }} </span>
    </div>

    <!-- <button
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
    >
      <i class="ion-plus-round"></i>
      &nbsp; {{ article.author.following ? "UnFollow" : "Follow" }}
      {{ article.author.username }}
      <span class="counter"></span>
    </button> -->
    &nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{ active: !article.favorited }"
      @click="fav(article)"
    >
      <i class="ion-heart"></i>
      &nbsp; {{ article.favorited ? "UnFavorite" : "Favorite" }} Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>
import { delFavorite, addFavorite } from "@/api/article";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async fav(article) {
      if (article.favorited) {
        await delFavorite(article);
        article.favorited = false;
        article.favoritesCount--;
      } else {
        await addFavorite(article);
        article.favorited = true;
        article.favoritesCount++;
      }
    },
  },
};
</script>

<style>
</style>