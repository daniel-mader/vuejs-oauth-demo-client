<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="home">
      <p v-if="isLoggedIn">User: {{ username }}</p>
      <button class="btn" @click="login" v-if="!isLoggedIn">Login</button>
      <button class="btn" @click="logout" v-if="isLoggedIn">Logout</button>
      <button class="btn" @click="getProtectedApiData" v-if="isLoggedIn">
        Make API call
      </button>
    </div>

    <div v-if="response">
      <p>
        {{ response.greeting }}
      </p>
    </div>
    <br />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Vue } from "vue-class-component";
import AuthService from "@/services/auth.service";

const auth = new AuthService();

export default class Home extends Vue {
  public currentUser = "";
  public accessTokenExpired: boolean | undefined = false;
  public isLoggedIn = false;

  public response = {};

  get username(): string {
    return this.currentUser;
  }

  public login() {
    auth.login();
  }

  public logout() {
    auth.logout();
  }

  public mounted() {
    auth.getUser().then((user: any) => {
      if (user) {
        this.currentUser = user.profile.name;
        this.accessTokenExpired = user.expired;
        this.isLoggedIn = user !== null && !user.expired;
      }
    });
  }

  public getProtectedApiData() {
    const authorizationHeader = "Authorization";
    auth.getAccessToken().then((userToken: string) => {
      axios.defaults.headers.common[
        authorizationHeader
      ] = `Bearer ${userToken}`;

      axios
        .get("http://localhost:9090/api/message")
        .then((response: any) => {
          console.log(response.data);
          this.response = response.data;
        })
        .catch((error: any) => {
          alert(error);
        });
    });
  }
}
</script>

<style>
.btn {
  color: #42b983;
  font-weight: bold;
  background-color: #007bff;
  border-color: #007bff;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid #42b983;
  padding: 0.375rem 0.75rem;
  margin: 10px;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
