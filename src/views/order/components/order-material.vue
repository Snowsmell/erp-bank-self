<template>
  <text-card class="order-material">
    <!-- 物资清单 -->
    <div v-if="title" class="left" slot="header">
      <span class="title">{{title}}</span>
    </div>
    <el-table
      :data="list"
      :summary-method="getSummaries"
      show-summary
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        width="80"
        label="编号">
      </el-table-column>
      <el-table-column
        v-if="list.product_name"
        prop="product_name"
        label="物资名称及规格">
      </el-table-column>
      <el-table-column
        v-else
        prop="produce_name"
        label="物资名称及规格">
      </el-table-column>            
      <el-table-column
        prop="producer"
        label="产地">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="件重(吨)">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="件数 (件)">
      </el-table-column>
      <el-table-column
        label="含税单价 (元/吨)">
        <template slot-scope="scope">
          ¥ {{scope.row.price | formatCurrency}}
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="含税总金额 (元)">
        <template slot-scope="scope">
          ¥ {{scope.row.amount | formatCurrency}}
        </template>
      </el-table-column>
    </el-table>

  </text-card>
</template>

<script>
import TextCard from '@/components/TextCard'
import { formatCurrency } from '@/filters'
export default {
  components: {
    TextCard
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    title: String
  },
  data() {
    return {
      tableFoot: {

      }
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((v, i, arr) => {
        const values = data.map(item => Number(item[v.property]))
        if (i === 0) {
          sums[i] = '合计'
        }         
        if (!values.every(value => isNaN(value))) {
          sums[i] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        }
        if (i === arr.length - 1) {
          sums[i] = '¥ ' + formatCurrency(sums[i])
        }
      })
      return sums
    }
  }
}
</script>
