<template>
  <div class="app">
    <div class="left-panel">
      <FolderTree
        :folders="folders"
        :open-folders="openFolders"
        :selected-id="selectedFolder?.id"
        @folder-click="onFolderClick"
      />
    </div>
    <div class="right-panel">
      <ul>
        <li v-for="sub in selectedFolder?.subfolders || []" :key="sub.id">
          📁 {{ sub.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import FolderTree from './components/FolderTree.vue'
import { getRootFolders, getFolderById } from './api/folderService'

const folders = ref([])

const selectedFolder = ref(null)
const openFolders = ref(new Set<string>())

onMounted(async () => {
  const result = await getRootFolders()
  folders.value = result
})

async function onFolderClick(folder) {
  selectedFolder.value = await getFolderById(folder.id)
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}

.app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.left-panel {
  width: 300px;
  padding: 1rem;
  background-color: black;
  border-right: 1px solid white;
  text-align: left; 
  color: white;
}

.right-panel {
  flex: 1;
  padding: 1rem;
  background-color: black;
  color: white;

  ul {
    list-style: none;
    padding-left: 0;
    text-align: left; 
    margin: 0;
  }

  li {
    padding: 4px 0;
    cursor: default;
  }
}
</style>