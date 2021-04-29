<template>
  <div class="px-4">
    <v-sheet color="transparent">
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(item, i) in stats" :key="i">
          <v-card class="py-6 px-10 elevation-5" outlined>
            <div>
              <div class="d-flex justify-space-between align-center">
                <div>
                  <div class="subtitle-2 text--secondary">
                    {{ item.label }}
                  </div>
                  <div class="text-h6 mt-1">
                    {{ item.title }}
                  </div>
                </div>

                <div>
                  <v-icon :color="item.color"  x-large v-if="i===0">{{ item.icon }}</v-icon>
                  <v-progress-circular
                      v-if="i===1||i===2"
                      :rotate="270"
                      :size="50"
                      :width="10"
                      :value="item.number"
                      :color="item.color"

                  >
                  </v-progress-circular>
                </div>
              </div>

              <div class="subtitle-2 d-flex align-center mt-5">
                <div>
                  <v-spacer></v-spacer>
                  <span class="success--text">{{ item.number }}</span>
                  <span class="ml-2 text--secondary">
                    {{ item.desc }}
                  </span>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" lg="6" xl="7">
          <v-card class="pa-10 elevation-5" outlined>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-h6">
                  待处理缴费信息
                </div>
              </div>
            </div>
            <template>
              <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :items-per-page="5"
                  class="elevation-24"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn color="error" class="elevation-5" @click="moneyalert(item)">提 醒</v-btn>
                </template>
              </v-data-table>
            </template>
          </v-card>
          <v-col></v-col>

          <v-card outlined class="pa-10 elevation-5">
            <div class="d-flex align-center justify-space-between">
              <div class="text-h6">
                待处理维修记录
              </div>

            </div>

            <template>
              <v-data-table
                  :headers="fixheader"
                  :items="fix"
                  :items-per-page="5"
                  class="elevation-24"
              >
              </v-data-table>
            </template>

          </v-card>
        </v-col>

        <v-col cols="12" lg="6" xl="5">
          <v-card class="pa-10 fill-height elevation-5" outlined>
            <div class="d-flex align-center justify-space-between">
              <div class="text-h6">
                公 告
              </div>
            </div>
            <v-carousel
                cycle
                height="400"
                hide-delimiter-background
                show-arrows-on-hover
            >
              <v-carousel-item v-for="item in poster" :key="item.poster_id">
                        <v-card
                            class="mx-auto"
                            color="#26c6da"
                            height="100%">
                          <v-card-title>
                            <v-icon large left>mdi-twitter</v-icon>
                            <span class="title font-weight-light">{{item.poster_title}}</span>
                          </v-card-title>
                            <v-card-text >{{item.poster_log}}</v-card-text>
                          <v-card-actions>
                            <v-list-item class="grow">
                              <v-list-item-avatar color="grey darken-3">
                                <v-img
                                    class="elevation-6"
                                    alt=""
                                    src="../../static/head.svg"
                                ></v-img>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>{{item.admin_name}}</v-list-item-title>
                              </v-list-item-content>
                              <v-list-item-content>
                                <v-list-item-title>发布时间：{{item.time}}</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-card-actions>
                        </v-card>
              </v-carousel-item>
            </v-carousel>


            <v-col >
              <div class="text-h6">
                未发布公告
              </div>

              <template>
                <v-data-table
                    :headers="posterheader"
                    :items="unposter"
                    :items-per-page="5"
                    class="elevation-24"
                    loading-text="无未发布的公告"
                    loading=false
                >
                  <template v-slot:item.actions="{ item }">
                    <v-btn color="primary" class="elevation-5" @click="post(item)">立即发布</v-btn>
                  </template>
                </v-data-table>
              </template>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <v-snackbar
        top
        v-model="bar1"
        :timeout="3000"
    >
      {{ mess }}
      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="bar1 = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
import { mdiAccountGroup } from '@mdi/js'
export default {
  data: () => ({
    bar1:false,
    headers: [
      {text: '姓 名', align: 'start', value: 'name'},
      { text: '金 额', value: 'charge_cost'},
      { text: '类 型', value: 'charge_memo' },
      { text: '截止日期', value: 'charge_ddl'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    fixheader: [
      {text: '姓 名', align: 'start', value: 'name'},
      { text: '地 址', value: 'addr',sortable: false},
      { text: '详 情', value: 'fix_log',sortable: false},
      // { text: 'Actions', value: 'actions', sortable: false },
    ],
    posterheader: [
      {text: '标 题', align: 'start', value: 'poster_title',width:100, sortable: false,},
      { text: '发布时间', value: 'time'},
      { text: '截止时间', value: 'endtime',},
      { text: 'Actions', value: 'actions', sortable: false, },
    ],
    chart: false,
    stats: [
      {label: "当前业主数", title: "", number: "", desc: "",
        icon: mdiAccountGroup, color: "error",
      },
      {label: "待处理缴费条目", title: "", number: "", desc: "",
        color: "warning",
      },
      {label: "待处理维修条目", title: "", number: "", desc: "",
        color: "accent",
      },
    ],
    optionsLine: {
      theme: {
        mode: "light",
        palette: "palette2",
      },

      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "vuechart-line",
        dropShadow: {
          enabled: true,
          top: 3,
          left: 3,
          blur: 10,
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    optionsBar: {
      theme: {
        mode: "light",
        palette: "palette7",
      },

      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "vuechart-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
    desserts: [],
    fix:[],
    mess:"",
    length: 3,
    window: 0,
    poster:[],
    unposter:[],
  }),
  mounted() {
    this.chart = true;
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize() {
      this.axios.get('/api/user/poster')
          .then(res => {
            this.poster=res.data
          }, res => {
            console.log(res);
          })
      this.axios.get('/api/user/unposter')
          .then(res => {
            this.unposter=res.data
          }, res => {
            console.log(res);
          })
      this.axios.get('/api/user/postercount')
          .then(res => {
            this.length = res.data
          }, res => {
            console.log(res);
          })
      this.axios.get('/api/user/custnum')
          .then(res => {
            this.stats[0]['title']=res.data
          }, res => {
            console.log(res);
          })
      this.axios.get('/api/user/todaymoney')
          .then(res => {
            this.stats[1]['title']=res.data['fail']
            this.stats[1]['number']=res.data['succ']
          }, res => {
            console.log(res);
          })
      this.axios.get('/api/user/fix')
          .then(res => {
            this.stats[2]['title']=res.data['fail']
            this.stats[2]['number']=res.data['succ']
          }, res => {
            console.log(res);
          })
      this.axios.get('/api/user/money')
          .then(res => {
            this.desserts = res.data
          }, res => {
            console.log(res);
          })
      this.axios.get('/api/user/todayfix')
          .then(res => {
            this.fix = res.data
          }, res => {
            console.log(res);
          })
    },
    moneyalert(item){
      this.axios.post('/api/user/moneyalert', JSON.stringify(item))
          .then(res => {
            this.mess = res.data["mess"]
            this.bar1 = true
          },res => {
            console.log(res);
          })
    },
    post(item){
      var mess = {"id":item.poster_id}
      this.axios.post('/api/user/post', JSON.stringify(mess))
          .then(res => {
            this.mess = res.data["mess"]
            this.bar1 = true
          },res => {
            console.log(res);
          })
    },
  },
};
</script>
