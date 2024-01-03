<script lang="ts" setup>

import axios from "axios"
import { ref } from "vue"

const searchText = ref("")
interface APIResults {
  results?: any;
}
const results = ref<APIResults>({})
const fetchData = async ()=> {
  const response = await axios.get(`https://swapi.dev/api/people/?search=${searchText.value}`);
  results.value = response.data;
}
</script>

<template>
  <div class="about">
    <label for="searchInput">Search:</label>
    <input v-model="searchText" id="searchText" />
    <button @click="fetchData">Search</button>
    <ul>
      <li v-for="result in results.results" :key="result.url">
        <dl>
          <dt>name</dt>
          <dd>{{ result.name }}</dd>
        </dl>
        <dl>
          <dt>height</dt>
          <dd>{{ result.height }}</dd>
        </dl>
        <dl>
          <dt>mass</dt>
          <dd>{{ result.mass }}</dd>
        </dl>
      </li>
    </ul>
    <pre>
      {{ results }}
    </pre>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
