<template>
  <div class="multipl-list" style="max-height:600px; overflow-y:auto">    
    <div v-for="(item, index) in info.registered_faces" :key="index" class="multipl-list-item">
      <p>{{info.registered_names[index]}}</p>
      <ul>
        <li>
          <div><img :src="item" ></div>
          <p>人像采集照片</p>
        </li>
        <li>
          <div><img :src="info.real_faces[index]" alt=""></div>
          <p>确权时人脸识别照片</p>
        </li>  
        <li>人脸匹配分数<p>{{info.scores[index]}}</p></li>      
      </ul>
      
    </div>

  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  }
}
</script>

