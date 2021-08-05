<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">罗毅</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your',
                    },
                  }"
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'your',
                  }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global',
                    },
                  }"
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'global',
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                    },
                  }"
                  exact
                  class="nav-link"
                  :class="{
                    active: tab === 'tag',
                  }"
                >
                  # {{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
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
                <span class="date">
                  {{ article.createdAt | date("MMM DD, YYYY") }}</span
                >
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
                  disabled: article.favDisabled,
                }"
                @click="fav(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page,
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: tag,
                      tab: tab,
                    },
                  }"
                >
                  {{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag: tag,
                    tab: 'tag',
                  },
                }"
                v-for="tag in tags"
                :key="tag"
                class="tag-pill tag-default"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getArticles,
  getFeedArticles,
  delFavorite,
  addFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const tag = query.tag;
    const tab = query.tab || "global";
    const limit = 20;

    const loadArt = tab === "your" ? getFeedArticles : getArticles;
    const [artRst, tagRst] = await Promise.all([
      loadArt({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);

    const { articles, articlesCount } = artRst.data;
    articles.forEach((article) => {
      article.favDisabled = false;
    });
    const { tags } = tagRst.data;
    return {
      articles,
      articlesCount,
      limit,
      page,
      tags,
      tag,
      tab,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"]),
  },
  methods: {
    async fav(article) {
      article.favDisabled = true;
      if (article.favorited) {
        await delFavorite(article);
        article.favorited = false;
        article.favoritesCount--;
      } else {
        await addFavorite(article);
        article.favorited = true;
        article.favoritesCount++;
      }
      article.favDisabled = false;
    },
  },
};
</script>
githun
<style>
</style>