<template>
<el-container direction="vertical">
  <app-header></app-header>

  <app-main>
    <!-- <order-header type="company" :info="supplierData"></order-header> -->
    <company class="mb2"/>

    <el-tabs
      value="payment"
      type="card"
      class="mb2"
      style="padding: 20px; background-color: #fff;">
      <el-tab-pane
        label="付款申请单"
        name="payment">
        <order-fkd :info="{}">
        </order-fkd>
        <order-material :list="[]" title="物资清单">
        </order-material>
      </el-tab-pane>
      <el-tab-pane label="采购合同" name="orderDetail">
        <order-cght :info="{}">
        </order-cght>
        <order-material :list="[]" title="物资清单">
        </order-material>
      </el-tab-pane>
      <el-tab-pane label="项目合同" name="projectDetail">
        <order-xmht :info="{}"></order-xmht>
      </el-tab-pane>
      <el-tab-pane label="数据汇总" name="projectSummary">
        <order-sjhz :info="{}">
          <div slot="foot">备注信息：一些乱七八糟的内容....</div>
        </order-sjhz>
      </el-tab-pane>
    </el-tabs>

    <order-media class="mb2"/>

    <order-process class="mb2"/>

    <order-transport/>

  </app-main>

  <app-footer>
    <el-button type="primary" class="w150">申请重审</el-button>
  </app-footer>
  
</el-container>
</template>

<script>
import { AppHeader, AppMain, AppFooter } from '@layout/components'

import {
  Company,
  OrderFkd,
  OrderCght,
  OrderXmht,
  OrderSjhz,
  OrderMaterial,
  OrderJjd,
  OrderMedia,
  OrderProcess,
  OrderTransport
} from './components'

export default {
  components: {
    AppHeader, AppMain, AppFooter,
    Company,
    OrderFkd,
    OrderCght,
    OrderXmht,
    OrderSjhz,
    OrderMaterial,
    OrderJjd,
    OrderMedia,
    OrderProcess,
    OrderTransport
  }
}
</script>
