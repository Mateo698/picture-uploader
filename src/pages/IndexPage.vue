<template>
  <q-page class="column items-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <div>
      <q-btn
      color="primary"
      label="Toggle bar"
      @click="toggle()"
    />
    </div>
    
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  props: ['toggle']
})
</script>
