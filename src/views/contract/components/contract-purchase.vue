<template>
<text-card>
  <div class="left" slot="header">
    <span class="title">采购合同</span>
  </div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">采购合同编号：</div>
      <div class="detail">{{info.contract_code}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">供方：</div>
      <div class="detail">{{info.parta}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">采购部门：</div>
      <div class="detail">{{info.department}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">合同总金额：</div>
      <div class="detail">{{info.contract_sum}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">采购员：</div>
      <div class="detail">{{info.purchase_name}}</div>
    </el-col>
    
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">签订日期：</div>
      <div class="detail">¥ {{info.contract_date}}</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">原始合同编号：</div>
      <div class="detail">---</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">需方：</div>
      <div class="detail">---</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">备注：</div>
      <div class="detail">---</div>
    </el-col>
    <el-col :xs="24" :sm="12" :xl="8">
      <div class="term">签订地点：</div>
      <div class="detail">---</div>
    </el-col>
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
    }
  }
}
</script>
