<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        loading="loadin"
        multi-sort
        loading-text="Waiting"
    ></v-data-table>
</template>

<script>
export default {
  data (){
    return {
      loadin:true,
      sortBy: 'time',
      sortDesc: false,
      headers: [
        {
          text: '业主姓名',
          align: 'start',
          value: 'cust_name',
        },
        { text: '缴费状态', value: 'charge_status' },
        { text: '缴费单生成时间', value: 'charge_time' },
        { text: '应缴金额（元）', value: 'charge_cost' },
        { text: '截止日期', value: 'charge_ddl' },
        { text: '备注', value: 'charge_memo' },
      ],
      desserts: [],
    }
  },
  mounted() {
    this.queryCharge();
  },
  methods:{
    queryCharge:function (){
      this.axios.get('/api/userCharge/queryUserCharge')
          .then(res => {
            this.desserts=res.data;
            this.loadin=!this.loadin;
            },res => {
            console.log(res);
          })
    },
  },
};
</script>
