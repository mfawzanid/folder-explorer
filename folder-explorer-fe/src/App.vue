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
import { ref } from 'vue'
import FolderTree from './components/FolderTree.vue'

// dummy data 
const folders = ref([
  {
    id: 'a',
    name: 'Folder A',
    subfolders: [
      { id: 'a1', name: 'Folder A1', subfolders: [] },
      {
        id: 'a2',
        name: 'Folder A2',
        subfolders: [
          { id: 'a2a', name: 'Folder A2a', subfolders: [] }
        ]
      }
    ]
  },
  {
    id: 'b',
    name: 'Folder B',
    subfolders: [
      { id: 'b1', name: 'Folder B1', subfolders: [] }
    ]
  }
])

const selectedFolder = ref(null)
const openFolders = ref(new Set<string>())

function onFolderClick(folder) {
  selectedFolder.value = folder
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