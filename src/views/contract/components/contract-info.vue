<template>
  <text-card>
    <div v-if="title" class="left" slot="header">
      <span class="title">{{title}}</span>
      <span class="proNo">{{projectNo}}</span>
    </div>
    <el-row :gutter="20" class="thisRow">
      <el-col :span="8">
        <div class="term">项目名称：</div>
        <div class="detail">{{info.project_name}}</div>
      </el-col>
      <el-col :span="8">
        <div class="term">甲方：</div>
        <div class="detail">{{info.parta}}</div>
      </el-col>
      <el-col :span="8" v-if="ascription === '1'">
        <div class="term">账期：</div>
        <div class="detail">{{info.payment_days}}</div>
      </el-col> 
    </el-row>
    <el-row :gutter="20" class="thisRow">
      <el-col :span="8">
        <div class="term">乙方：</div>
        <div class="detail">{{secondName}}</div>
      </el-col> 
      <el-col :span="8">
        <div class="term">项目开始日期：</div>
        <div class="detail">{{proStartTime | formatTime}}</div>
      </el-col> 
      <el-col :span="8">
        <div class="term">项目合同签订日：</div>
        <div class="detail">{{info.contract_date | formatTime}}</div>
      </el-col> 
    </el-row>
    <el-row :gutter="20" class="thisRow">
      <el-col :span="8">
        <div class="term">项目合同到期日：</div>
        <div class="detail">{{proEndTime | formatTime}}</div>
      </el-col> 
      <el-col :span="8">
        <div class="term">项目合同金额(万)：</div>
        <div class="detail">{{info.contract_sum}}</div>
      </el-col> 
    </el-row>
  </text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    TextCard
  },
  props: {
    title: {
      type: String
    },
    info: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      ascription: state => state.contract.ascription
    }),
    ...mapGetters({
      proStartTime: 'proStartTime',
      secondName: 'secondName',
      proEndTime: 'proEndTime',
      signTime: 'signTime'
    }),
    projectNo() {
      if (this.ascription === '1') {
        return this.info.project_code
      } else {
        return this.info.contract_code
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.thisRow {
  padding: 10px 0;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
}
.proNo {
  display: inline-block;
  font-size: 16px;
  margin-left: 20px;
  color: #ccc;
}

</style>
