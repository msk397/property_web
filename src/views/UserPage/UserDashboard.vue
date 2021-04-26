<template>
  <div class="px-4">
    <v-sheet color="transparent">
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="(item, i) in stats" :key="i">
          <v-card class="py-6 px-10" outlined>
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
                  <v-icon :color="item.color"  x-large v-if="i==0">{{ item.icon }}</v-icon>
                  <v-progress-circular
                      v-if="i==1||i==2"
                      :rotate="270"
                      :size="50"
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
          <v-card class="pa-10" outlined>
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-h6">
                  待处理缴费信息
                </div>
              </div>

              <div>
                <v-btn color="primary" small>处 理</v-btn>
              </div>
            </div>

            <v-simple-table class="mt-4" height="450">
              <template v-slot:default>
                <thead class="primary ">
                <tr>
                  <th class="text-left white--text">业主姓名</th>
                  <th class="text-left white--text">金 额</th>
                  <th class="text-left white--text">类 型</th>
                  <th class="text-left white--text">截止日期</th>
                  <th class="text-left white--text">通 知</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in desserts" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.charge_cost }}</td>
                  <td>{{ item.charge_memo }}</td>
                  <td>{{ item.charge_ddl }}</td>
                  <td><v-btn color="error">提 醒</v-btn></td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <v-col></v-col>
          <v-card outlined class="pa-10">
            <div class="d-flex align-center justify-space-between">
              <div class="text-h6">
                待处理维修记录
              </div>

            </div>

            <v-simple-table class="mt-4" height="450">
              <template v-slot:default>
                <thead class="primary ">
                <tr>
                  <th class="white--text">姓 名</th>
                  <th class="white--text">地 址</th>
                  <th class="white--text">详 情</th>
                  <th class="white--text">通 知</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in fix" :key="item.name">
                  <td>{{ item.name }}</td>
                  <td>{{ item.addr }}</td>
                  <td>{{ item.fix_log }}</td>
                  <td><v-btn color="green">处 理</v-btn></td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>

        <v-col cols="12" lg="6" xl="5">
          <v-card class="pa-10 fill-height" outlined>
            <div>
              <div class="subtitle-2">
                PERFORMANCE
              </div>

              <div class="text-h6">
                Total orders
              </div>
            </div>

            <apexchart
              v-if="chart"
              width="100%"
              height="900"
              class="mt-4"
              type="bar"
              :options="optionsBar"
              :series="series"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { mdiAccountGroup } from '@mdi/js'
export default {
  data: () => ({
    chart: false,
    stats: [
      {
        label: "当前业主数",
        title: "350,897",
        number: "",
        desc: "",
        icon: mdiAccountGroup,
        color: "error",
      },
      {
        label: "今日应收钱款",
        title: "",
        number: "",
        desc: "",
        color: "warning",
      },
      {
        label: "维修率",
        title: "",
        number: "",
        desc: "",
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
    desserts: [],fix:[],
    traffics: [
      {
        name: "Facebook",
        visitors: "1,230",
        rate: "40",
        color: "success",
      },
      {
        name: "Google",
        visitors: "4,350",
        rate: "12",
        color: "primary",
      },
      {
        name: "Instagram",
        visitors: "6,687",
        rate: "65",
        color: "secondary",
      },
      {
        name: "twitter",
        visitors: "5,106",
        rate: "71",
        color: "accent",
      },
    ],
  }),
  mounted() {
    this.chart = true;
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize() {
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
  },
};
</script>
