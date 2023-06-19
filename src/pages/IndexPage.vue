<template>
  <q-page class="column items-center" style="background-color: #fff4c3;">
    <!-- Renders if the data its present -->
    <div v-if="data.length != 0" class="row justify-center">
      <q-card
        :style="{ width: calculateWidth(), height: '300px', backgroundImage: 'url(' + item.url + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
        v-for="item in data" :key="item" class="column q-ma-sm">
        <q-space />
        <q-card-actions align="center" style="background-color: black; background: -webkit-gradient(
              linear,
              left bottom,
              left top,
              color-stop(1, rgba(0,0,0,0.0)), /* Top */
              color-stop(0, rgba(0,0,0,1.0)) /* Bottom */
          );">
          <q-btn color="accent" icon="delete" @click="deleteImage(item)" />
          <q-btn color="secondary" icon="visibility" @click="editImage(item)" />
          <q-btn color="primary" icon="download" @click="downloadImage(item)" />
        </q-card-actions>
      </q-card>
    </div>
    <!-- Renders if the data its not present -->
    <div class="fit column  justify-center items-center content-center" v-else style="flex-grow: 1;">
      <h2 class="text-h2 q-mx-xl">Upload your first picture!</h2>

      <q-btn label="Add photo" class="q-my-xl" color="secondary" rounded  @click="card = true"/>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="data.length != 0">
      <q-btn fab icon="add" label="New Picture" color="secondary" @click="card = true" />
    </q-page-sticky>
  </q-page>

  <q-dialog v-model="card">
    <q-card class="my-card">
      <q-img src="../assets/upload.png" v-if="!files" />
      <q-img :src="uploadedImage" v-else />
      <q-card-section>
        <q-file v-model="files" label="Pick a picture" filled counter multiple style="max-width: 300px" />
      </q-card-section>
      <q-separator />
      <q-card-actions align="center">
        <q-btn v-close-popup flat color="primary" label="Upload" @click="uploadImage()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this picture?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Confirm" color="primary" @click="handleConfirm" />
          <q-btn label="Cancel" color="primary" @click="handleCancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
/* eslint-disable */
import { defineComponent } from 'vue'
import { ref, watch } from 'vue'
import { storage } from 'src/boot/firebase'
import { uploadBytes, getDownloadURL, deleteObject,listAll } from 'firebase/storage'
import {ref as storageRef} from 'firebase/storage'
import { getAuth} from 'firebase/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  props: ['toggle'],
  data() {
    return {
      data: [],
      dataRef : []
    }
  },
  methods: {
    handleConfirm() {
      this.confirm = false
      deleteObject(this.selectedImage.ref).then(() => {
        // Delete the file from the data array
        this.data.splice(this.data.indexOf(this.selectedImage), 1)
        // Delete the file from the dataRef array
        this.dataRef.splice(this.dataRef.indexOf(this.selectedImage.ref), 1)
        // Delete the file from the storage
        console.log(this.selectedImage.ref)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleCancel() {
      this.confirm = false
      this.selectedImage = null
    },
    calculateWidth() {
      const width = window.innerWidth
      if (width < 600) {
        return '150px'
      } else if (width < 900) {
        return '200px'
      } else {
        return '300px'
      }
    },
    deleteImage(item) {
      console.log(item)
      this.selectedImage = item
      this.confirm = true
    },
    editImage(item) {
      console.log(item)
    },
    downloadImage(item) {
      const a = document.createElement('a')
      getDownloadURL(item.ref).then((url) => {
        const router = useRouter()
        a.href = ""
        a.download = url
        console.log(url)
        this.router.push(url)
      })

      

    },
    async getData(){
      const userUID = getAuth().currentUser.uid
      const imageRef = storageRef(storage, `${userUID}/`);
      listAll(imageRef).then((res) => {
        this.dataRef = res.items
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            this.data.push({url: url, ref: itemRef})
          })
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    uploadImage(){
      if(this.uploadedImage){
        const img = document.createElement('img')
        img.src = this.uploadedImage
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAXWIDTH = 720
          const ratio = MAXWIDTH / img.width
          canvas.width = MAXWIDTH
          canvas.height = img.height * ratio
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          const srcEncoded = ctx.canvas.toDataURL(img, 'image/png');
          console.log(srcEncoded)
          fetch(srcEncoded).then(res => res.blob()).then(blob => {
            const userUID = getAuth().currentUser.uid
            const imgRef = storageRef(storage, `${userUID}/${this.files[0].name.split('.')[0]}`) //
            uploadBytes(imgRef, blob).then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                this.data.push({url: url, ref: snapshot.ref})
              })
              this.card = false
            });
          })
        }
    }}
    
  }
  , setup() {
    const card = ref(false)
    const files = ref(null)
    const uploadedImage = ref(null)
    const confirm = ref(false)
    const selectedImage = ref(null)

    const pictureReader = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        uploadedImage.value = e.target.result;
      }
    }
    watch(files, (val) => {
      pictureReader(val[0])
    })
    return { card, files, uploadedImage, confirm,selectedImage}
  },mounted(){
    this.getData()
  }
})
</script>

<style scoped></style>
```
