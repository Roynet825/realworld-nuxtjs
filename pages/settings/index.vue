<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="update">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="user.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.username"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="user.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="user.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                @click="update"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "auth",
  name: "SettingIndex",
  data: function () {
    const user = this.$store.state.user;
    return {
      user: {
        image: user.image,
        username: user.username,
        bio: user.bio,
        email: user.email,
      },
      password: "",
    };
  },
  methods: {
    async update() {
      let ud = this.user;
      if (this.password) {
        ud = {
          ...this.user,
          password: this.password,
        };
      }
      const { data } = await updateUser(ud);
      this.$store.commit("setUser", data.user);
      Cookie.set("user", JSON.stringify(data.user));
    },
  },
};
</script>

<style>
</style>