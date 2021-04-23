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

    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>业主信息管理</v-toolbar-title>
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
              添加信息
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
                    <v-text-field
                        v-model="editedItem.cust_loginname"
                        label="用户名"
                        v-if="editedIndex == -1"
                    ></v-text-field>
                    <v-text-field
                        v-model="editedItem.cust_loginname"
                        label="用户名"
                        disabled
                        v-if="editedIndex != -1"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.cust_name"
                        label="姓名"
                    ></v-text-field>
                  </v-col>
                </v-row>
                  <v-row>
                    <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-select
                          :items="floor"
                          label="楼号"
                        v-model="editedItem.cust_floor"
                      ></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-select
                          :items="unit"
                          label="单元"
                          v-model="editedItem.cust_unit"
                      ></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col
                        class="d-flex"
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-text-field
                          label="门牌号"
                          v-model="editedItem.cust_door"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem.cust_phone"
                        label="联系方式"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>

                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                      <v-btn
                          v-if="editedIndex != -1"
                          depressed
                          color="error"
                          @click="resetPass"
                      >
                        重置密码
                      </v-btn>
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
            <v-card-title class="headline">确定要删除该信息吗?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="reset" persistent
                  max-width="180">
          <v-card>
            <v-card-title class="headline">
              确认新密码
            </v-card-title>
            <v-card-text>新密码为{{newPass}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="reset = false">OK</v-btn>
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
    floor:['1','2','3','4','5','6','7','8'],
    reset:false,
    resetpass:'nu',
    unit:['A','B','C'],
    timeChoose:false,
    modal: false,
    name: window.sessionStorage.getItem('name'),
    search:"",
    sortBy:"poster_date",
    sortDesc:false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: '姓名', align: 'start', value: 'cust_name'},
      { text: '用户名', value: 'cust_loginname',sortable: false},
      { text: '联系方式', value: 'cust_phone' },
      { text: '门牌号', value: 'cust_addr'},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    custname: [],
    editedIndex: -1,
    editedItem: {
      cust_addr:'',
      cust_floor:'',
      cust_unit:'',
      cust_door:'',
      cust_loginname:'',
      cust_name:'',
      cust_id:'',
      cust_phone:'',
    },
    defaultItem: {
      cust_addr:'',
      cust_floor:'',
      cust_unit:'',
      cust_door:'',
      cust_loginname:'',
      cust_name:'',
      cust_id:'',
      cust_phone:'',
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? '添加信息' : '编辑信息'
    },
    newPass () {
      return this.resetpass
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

    initialize () {
      this.axios.get('/api/userCust/queryCust')
          .then(res => {
            console.log(res.data);
            this.desserts=res.data;
            this.loadin=!this.loadin;
          },res => {
            console.log(res);
          })
    },
    resetPass(){
      var mess={'id':this.editedItem.cust_id , 'name':this.editedItem.cust_name}
      this.axios.post('/api/userCust/resetPass', JSON.stringify(mess))
          .then(res => {
            this.resetpass = res.data;
          },res => {
            console.log(res);
          })
      this.reset = true
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
      var  mess = {'id':this.editedItem.cust_id}
      this.axios.post('/api/userCust/DelCust', JSON.stringify(mess))
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
        this.axios.post('/api/userCust/changeCustMess', JSON.stringify(this.editedItem))
        this.initialize()

      } else {
        /*增加*/
        var mess = this.editedItem
        delete  mess.cust_addr
        delete  mess.cust_id
        this.axios.post('/api/userCust/AddCust', JSON.stringify(mess))
            .then(res => {
              this.resetpass = res.data;
            },res => {
              console.log(res);
            })
        this.reset = true
        this.initialize()
      }
      this.close()
    },
  },
}
</script>