<template>
  <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      loading="loadin"
      multi-sort
      :search="search"
      loading-text="Waiting"
  >
    <!--  颜色  -->
    <template v-slot:item.status="{item }">
      <v-chip
          :color="getColor(item.status)"
          dark
      >
        {{ item.status}}
      </v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>公告管理</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              添加公告
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <!-- ==-1 为添加                   -->
                    <v-text-field
                        v-model="name"
                        label="发布人员"
                        v-if="editedIndex == -1"
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-model="editedItem.admin_name"
                        label="发布人员"
                        v-if="editedIndex != -1"
                        disabled
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        v-model="editedItem.poster_title"
                        label="标题"
                    ></v-text-field>
                  </v-col>
                  <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-menu
                        ref="dialog_timer"
                        v-model="modal"
                        :close-on-content-click="false"
                        :return-value.sync="editedItem.poster_date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="editedItem.poster_date"
                            label="发布日期"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="editedItem.poster_date"
                          no-title
                          locale="zh-cn"
                          scrollable
                          :allowed-dates="allowedDates"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog_timer.save(editedItem.poster_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-menu
                        ref="menu"
                        v-model="timeChoose"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="editedItem.poster_time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="editedItem.poster_time"
                            label="发布时间"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                          scrollable
                          v-if="timeChoose"
                          v-model="editedItem.poster_time"
                          full-width
                          format="24hr"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="timeChoose = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(editedItem.poster_time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-menu>
                  </v-col>
                  </v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="10"
                  >
                    <v-textarea
                        outlined
                        v-model="editedItem.poster_log"
                        label="公告详情"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">确定要删除该公告吗?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- 这里是action里面的图标   -->
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <v-btn
          color="primary"
          @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    /*    nowDate:new Date().toLocaleDateString(),*/
    timeChoose:false,
    modal: false,
    name: window.sessionStorage.getItem('name'),
    search:"",
    sortBy:"poster_date",
    sortDesc:false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: '标题', align: 'start', value: 'poster_title',sortable: false},
      { text: '发布日期', value: 'poster_date' },
      { text: '发布时间', value: 'poster_time' },
      { text: '公告详情', value: 'poster_log',sortable: false},
      { text: '是否已发布', value: 'status'},
      { text: '发布人', value: 'admin_name'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    custname: [],
    editedIndex: -1,
    editedItem: {
      poster_id:'',
      admin_name:'',
      poster_log:'',
      poster_date:'',
      poster_time:'',
      poster_title:'',
    },
    defaultItem: {
      poster_id:'',
      admin_name:'',
      poster_log:'',
      poster_date:new Date().toJSON().substring(0, 10),
      poster_time:new Date().toTimeString().substring(0,5),
      poster_title:'',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '添加通知' : '编辑通知'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()

  },
  methods: {
    allowedDates: val => Date.parse(val) > Date.now() - 8.64e7,

    getColor (calories) {
      if (calories == "已发布") return 'green'
      else return 'red'
    },

    initialize () {
      this.axios.get('/api/userPoster/queryPoster')
          .then(res => {
            this.desserts=res.data;
            this.loadin=!this.loadin;
          },res => {
            console.log(res);
          })
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    },
    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.desserts.splice(this.editedIndex, 1)
      const  mess = {'poster_id':this.editedItem.poster_id}
      this.axios.post('/api/userPoster/DelPoster', JSON.stringify(mess))
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    /*缴费信息保存*/
    save () {
      if (this.editedIndex > -1) {
        /*修改*/
        this.axios.post('/api/userPoster/changePoster', JSON.stringify(this.editedItem))
        this.initialize()

      } else {
        /*增加*/
        const  mess = this.editedItem
        mess.admin_name = this.name
        this.axios.post('/api/userPoster/AddPoster', JSON.stringify(mess))
        this.initialize()
      }
      this.close()
    },
  },
}
</script>