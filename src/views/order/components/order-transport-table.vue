<template>
  <el-table
    :data="list"
    tooltip-effect="light"
    show-summary
    style="width: 100%">
    <el-table-column
      type="index"
      align="center"
      label="编号"
      width="80">
    </el-table-column>
    <el-table-column
      label="提单号">
      <template slot-scope="scope">
        <router-link :to="{name: 'OrderDetail', query: orderQuery}">{{scope.row.delivery_code}}</router-link>
      </template>
    </el-table-column>
    <el-table-column
      width="180"
      label="物资名称及规格">
      <template slot-scope="scope">
        <span v-for="(item, index) in scope.row.detail_list" :key="index" class="item">
          {{ item.produce_name }}<br />
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      width="300"
      label="提货地点">
    </el-table-column>
    <el-table-column
      label="件重(吨)">
      <template slot-scope="scope">
        <span v-for="(item, index) in scope.row.detail_list" :key="index" class="item">
          {{ item.weight }}<br />
        </span>
      </template>
    </el-table-column>
    <el-table-column
      label="件数(件)">
      <template slot-scope="scope">
        <span v-for="(item, index) in scope.row.detail_list" :key="index" class="item">
          {{ item.quantity }}<br />
        </span>
      </template>
    </el-table-column>
    <el-table-column
      label="含税单价(元/吨)">
      <template slot-scope="scope">
        <span v-for="(item, index) in scope.row.detail_list" :key="index" class="item">
          {{ item.price }}<br />
        </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="amount"
      label="总金额(元)">
    </el-table-column>
    <el-table-column
      label="提货时间">
      <template slot-scope="scope">
        {{scope.row.delivery_date | formatTime}}
      </template>
    </el-table-column>
    <!-- <el-table-column
      label="收货时间">
      <template slot-scope="scope">
        {{receiveDate | formatTime}}
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    receiveDate: [Number, String]
  },
  computed: {
    orderQuery() {
      const { payId, orderId, projectCode, vendorCode } = this.$store.state.order['orderUrlQuery']
      return payId ? { payId, vendorCode } : orderId ? { orderId, projectCode, vendorCode } : {}
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  line-height: 2;
}
</style>
