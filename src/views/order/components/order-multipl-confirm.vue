<template>
  <!-- 多人确权 -->
  <div class="order-multilp-confirm" style="margin:20px 0;color:#333;font-size:14px;padding:20px;background:#fff">
    <div>{{title}}</div>
    <hr>
    <template v-if="qqData.code">
      <div class="person" style="border-bottom:1px solid #333;padding-bottom:20px;margin-bottom:20px;overflow:hidden">
        <p>确权人</p>
        <ul v-if="qqData.registered_faces.length>0">
          <template v-for="(item, index) in qqData.registered_faces" >
          <li :key="'person-'+index">        
            <media-item
              :url="qqData.real_faces[index]"
              :key="'face-'+index"
              :fileType="getFileType(qqData.real_faces[index]) "
              :multipl="true"
              @showMultipl="showMultipl"/>   
              <p>{{qqData.real_names[index]}}</p>
          </li>          
          </template>
        </ul>
        <div v-else>暂无确权人数据</div>
      </div>
      <div>
        <p v-if="qqData.door_head_urls.length<1 && qqData.bill_urls.length<1 && qqData.sign_vedio_urls.length<1">
          暂无门头照片or账单照片or签字视频
        </p>
        <ul>
          <template v-for="(item, index) in qqData.door_head_urls" >
            <li :key="item+index">
              <media-item              
                :url="item.replace(/[\\]/g, '')"
                :key="'headphoto-'+index"
                :fileType="getFileType(item)"
                @on-preview="handleImagePreview"/>
                <p>门头照</p>      
            </li>            
          </template>
          <template v-for="(item, index) in qqData.bill_urls" >
            <li :key="item+index">
              <media-item              
                :url="item.replace(/[\\]/g, '')"
                :key="'bill-'+index"
                :fileType="getFileType(item)"
                @on-preview="handleImagePreview"/>
                <p>账单</p>      
            </li>            
          </template>
          <template v-for="(item, index) in qqData.sign_vedio_urls" >
            <li :key="item+index">
              <media-item              
                :url="item.replace(/[\\]/g, '')"
                :key="index"
                :fileType="getFileType(item)"
                @on-preview="handleImagePreview"/>
                <p>签字视频</p>      
            </li>            
          </template>                  
        </ul>
      </div>

    </template>
    <div v-else style="text-align:center;padding:20px 0;">
      <span>暂无数据</span>
    </div>
    <el-dialog
      :before-close="dialogClose"
      :visible.sync="dialogVisible"
      top="10vh"
      :append-to-body="true"    
      class="media-dialog">
      <a :href="dialogMediaUrl" target="_blank">
        <img v-if="meidaType === 'image'" class="pic" :src="dialogMediaUrl" alt="">
      </a>
      <video v-if="meidaType === 'video'" :src="dialogMediaUrl" autoplay controls poster="~imgs/media_bg.png">
        抱歉，您的浏览器不支持内嵌视频!
      </video>
    </el-dialog>

    <el-dialog
      :before-close="multiplListClose"
      :visible.sync="multiplList"
      top="10vh"
      :append-to-body="true"
      class="multipl-dialog">
      <p slot="title">多方确权资料详情</p>
      <hr>
      <multipl-list :info="qqData"/>

    </el-dialog>
  
  </div>


</template>

<script>
import MediaItem from './order-media-item'
import MultiplList from './order-multipl-list'
import { fileSuffix } from '@/utils'

export default {
  name: 'OrderMultipl',
  components: {
    MediaItem,
    MultiplList
  },
  props: {
    confirmData: {
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      base: {
        user_ids: [],
        real_names: [],
        real_faces: [],
        registered_faces: [],
        registered_names: [],
        door_head_urls: [],
        bill_urls: [],
        sign_vedio_urls: [],
        scores: []
      },
      meidaType: 'image',
      dialogMediaUrl: '',
      dialogVisible: false,
      multiplList: false,
      deg: 0
    }
  },
  computed: {
    qqData() {
      return {
        ...this.base, ...this.confirmData
      }
    }
  },
  methods: {
    dialogClose(done) {
      this.dialogMediaUrl = ''
      done()
    },
    multiplListClose(done) {
      this.multiplList = ''
      done()      
    },
    handleImagePreview (url) {
      this.dialogMediaUrl = url
      this.dialogVisible = true
      this.meidaType = this.getFileType(url)
    },
    getFileType(file) {
      return fileSuffix(file)
    },
    showMultipl() {
      this.multiplList = true
    }        
  }  
}
</script>
