<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form">
        <div class="card-block">
          <textarea
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img
            src="https://iconfont.alicdn.com/t/7369a4df-72aa-49ab-8d9d-6747c441f3de.png"
            class="comment-author-img"
          />
          <button class="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>

      <div class="card" v-for="comment in comments" :key="comment.slug">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: comment.author.username,
              },
            }"
            class="comment-author"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: comment.author.username,
              },
            }"
            class="comment-author"
            >{{ comment.author.username }}</nuxt-link
          >
          <span class="date-posted">{{
            comment.createdAt | date("MMM DD, YYYY")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from "@/api/article";
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { comments: [] };
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
};
</script>

<style>
</style>