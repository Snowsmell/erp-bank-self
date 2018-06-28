<template>
  <div style="padding:0 20px">
    <p>物资清单</p>
    <table border="1" cellspacing="0" cellpadding="0" bordercolor="#f1f3f5" class="trans-table"        
        style="width:100%;text-align:center;border-collapse:collapse">
      <thead style="background:#FBFBFB">
        <tr>
          <th width="5%">编号</th>
          <th width="15%">物资名称及规格</th>
          <th width="15%">产地</th>
          <th width="15%">件重（吨）</th>
          <th width="15%">件数</th>
          <th width="20%">含税单价（元/吨）</th>
          <th width="15%">含税总金额（元）</th>
        </tr>         
      </thead>
      <tbody>
        <tr v-for="(v, i) in info.detail_list" :key=i>
          <td>{{i+1}}</td>
          <td>{{v.produce_name}}</td>
          <td>{{parseproducer}}</td>
          <td>{{v.weight}}</td>
          <td>{{v.quantity}}</td>
          <td>{{v.price}}</td>
          <td>{{v.price*v.weight | formatCurrency}}</td>
        </tr>
      </tbody>
      <tfoot>
        <td>合计</td>
        <td></td>
        <td></td>
        <td>{{info.weight}}</td>
        <td>{{info.count}}</td>
        <td></td>
        <td>{{info.amount | formatCurrency}}</td>
      </tfoot>
    </table>      
  </div>  
</template>

<script>
export default {
  props: {
    info: {
      required: true
    },
    parseproducer: {
      type: String
    }
  },
  data() {
    return {
      a: ''
    }  
  }
}
</script>
