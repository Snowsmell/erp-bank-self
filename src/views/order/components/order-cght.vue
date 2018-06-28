<template>
<text-card class="tablerow">
  <!-- 采购合同 -->
  <div v-if="title" class="left" slot="header">
    <span class="title">{{title}}</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :xl="24">
      <div class="title">采购合同 <span>{{info.order_code}}</span></div>
    </el-col>    
  </el-row>  
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">供方：</div>
      <div class="detail">{{info.vendor_name}}</div>
    </el-col>    
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">采购部门：</div>
      <div class="detail">{{info.department||"--"}}</div>
    </el-col>     
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">合同总金额：</div>
      <div class="detail">{{info.amount}}</div>
    </el-col>       
  </el-row>
  <el-row>
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">采购员：</div>
      <div class="detail">{{info.purchase_agent}}</div>
    </el-col> 
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">签订日期：</div>
      <div class="detail">{{info.sign_date | formatTime}}</div>
    </el-col>
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">原始合同编号</div>
      <div class="detail">{{info.order_code || '——'}}</div>
    </el-col>  
  </el-row>
  <el-row>
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">需方：</div>
      <div class="detail">{{ info.buyer }}</div>
    </el-col>    
    <!-- <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">备注：</div>
      <div class="detail">{{info.remark || '——' }}</div>
    </el-col>      
    <el-col :xs="24" :sm="8" :xl="8">
      <div class="term">签订地点：</div>
      <div class="detail">{{info.position || '八百里草原'}}</div>
    </el-col>        -->
  </el-row>
</text-card>
</template>

<script>
import TextCard from '@/components/TextCard'

export default {
  components: {
    TextCard
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    title: String
  }
}
</script>

