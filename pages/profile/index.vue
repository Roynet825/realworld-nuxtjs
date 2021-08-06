<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              v-if="user.username != profile.username"
              class="btn btn-sm action-btn btn-outline-secondary"
              :class="{ active: !profile.following }"
              @click="follow(profile)"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "UnFollow" : "Follow" }}
              {{ profile.username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'my',
                  }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'fav',
                  }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'fav',
                    },
                  }"
                  >Favorited Articles</nuxt-link
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
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: article.favorited,
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
              <p>{{ article.body }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li
                  v-for="tag in article.tagList"
                  :key="tag"
                  class="tag-default tag-pill tag-outline"
                >
                  {{ tag }}
                </li>
              </ul>
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
                    name: 'profile',
                    query: {
                      page: item,
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getProfile, follow, unFollow } from "@/api/profile";
import { getArticles, delFavorite, addFavorite } from "@/api/article";
export default {
  middleware: "auth",
  name: "ProfileIndex",
  async asyncData({ params, query }) {
    const page = query.page || 1;
    const limit = 10;
    const tab = query.tab || "my";
    const articleParam = {
      limit,
      offset: (page - 1) * limit,
    };
    if (tab === "fav") {
      articleParam.favorited = params.username;
    } else {
      articleParam.author = params.username;
    }
    const [profileRst, articleRst] = await Promise.all([
      getProfile(params.username),
      getArticles(articleParam),
    ]);
    console.log(articleRst);
    return {
      tab,
      profile: profileRst.data.profile,
      articles: articleRst.data.articles,
      totalPage: Math.ceil(articleRst.data.articlesCount / limit),
      page,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watchQuery: ["tab", "page"],
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
    async follow(profile) {
      if (profile.following) {
        await unFollow(profile.username);
        profile.following = false;
      } else {
        await follow(profile.username);
        profile.following = true;
      }
    },
  },
};
</script>

<style>
</style>