<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter.prevent="addTag"
                />

                <ul class="tag-list">
                  <li
                    v-for="tag in article.tagList"
                    :key="tag"
                    class="tag-default tag-pill tag-outline"
                  >
                    {{ tag }}
                  </li>
                </ul>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publish"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publishArticle } from "@/api/article";
export default {
  middleware: "auth",
  name: "EditorIndex",
  data: () => {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  methods: {
    addTag($event) {
      // console.log($event.target.value);
      const tag = $event.target.value;
      $event.target.value = "";
      if (!this.article.tagList.includes(tag)) {
        this.article.tagList.push(tag);
      }
    },
    async publish() {
      const { data } = await publishArticle(this.article);
      const slug = data.article.slug;
      this.$router.push(`/article/${slug}`);
    },
  },
};
</script>

<style>
</style>