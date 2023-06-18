<template>
  <q-page class="column items-center" style="background-color: #fff4c3;">
    <!-- Renders if the data its present -->
    <div v-if="data.length != 0" class="row justify-center" >
      <q-card 
      :style = "{width: '235px', height: '285px',backgroundImage: 'url(' + item + ')', backgroundSize: 'cover', backgroundPosition: 'center'}" 
      v-for="item in data" 
      :key="item" 
      class="column q-ma-lg">
        <q-space/>
        <q-card-actions align="center" style="background-color: black; background: -webkit-gradient(
              linear,
              left bottom,
              left top,
              color-stop(1, rgba(0,0,0,0.0)), /* Top */
              color-stop(0, rgba(0,0,0,1.0)) /* Bottom */
          );">
          <q-btn
            color="accent"
            label="Delete"
            @click="deleteImage(item)"
          />
          <q-btn
            color="secondary"
            icon="visibility"
            @click="editImage(item)"
          />
          <q-btn
            color="primary"
            icon="download"
            @click="downloadImage(item)"
          />
        </q-card-actions>
      </q-card>
    </div>
    <!-- Renders if the data its not present -->
    <div class="fit column  justify-center items-center content-center" v-else style="flex-grow: 1;">
      <text-h2 class="text-h2 q-mx-xl">Upload your first picture!</text-h2>
      
      <q-btn
        label="Add photo"
        class="q-my-xl"
        color="secondary"
        rounded
      />
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="data.length != 0">
      <q-btn fab icon="add" label="New Picture" color="secondary" @click="card = true" />
    </q-page-sticky>
  </q-page>

  <q-dialog v-model="card">
      <q-card class="my-card">
        <q-img src="../assets/upload.png" />
        <q-card-section>
          <q-file
          v-model="files"
          label="Pick files"
          filled
          counter
          :counter-label="counterLabelFn"
          max-files="3"
          multiple
          style="max-width: 300px"
          >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        </q-file>
        </q-card-section>
        

        <q-separator />

        <q-card-actions align="center">
          <q-btn v-close-popup flat color="primary" label="Reserve" />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent } from 'vue'
import router from 'src/router'
import {ref} from 'vue'

export default defineComponent({
  name: 'IndexPage',
  props: ['toggle'],
  data(){
    return{
      data : ['https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200','https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200','https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200','https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
      'https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200','https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg']
    }
  },
  methods:{
    deleteImage(item){
      console.log(item)
    },
    editImage(item){
      console.log(item)
    },
    downloadImage(item){
      console.log(item)
    },
    handleNewPicture(){
      this.$router.push('/new-picture')
    }
  }
  ,setup(){
    return{
      card: ref(false),
    }
  }
  })
</script>

<style scoped>

</style>
```
