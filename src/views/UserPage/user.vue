<template>
  <div>
    <v-navigation-drawer
        app
        :mini-variant="$vuetify.breakpoint.lgAndDown"
        expand-on-hover
        v-model="drawerDisplay"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 font-weight-black">
            物业管理系统
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
            v-for="item in drawer"
            :key="item.title"
            :to="item.to"
            :href="item.href"
            :target="item.target"
            exact
            color="primary"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat color="white">
      <v-app-bar-nav-icon
          v-if="$vuetify.breakpoint.lgAndDown"
          @click="drawerDisplay = !drawerDisplay"
      />

      <v-toolbar-items class="d-flex align-center">
        <v-text-field
            hide-details
            flat
            dense
            outlined
            solo
            label="Search"
            prepend-inner-icon="mdi-magnify"
        />
      </v-toolbar-items>

      <v-spacer />

      <v-btn icon>
        <v-icon>
          mdi-bell-outline
        </v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>
          mdi-apps-box
        </v-icon>
      </v-btn>

      <v-menu
          transition="slide-y-transition"
          bottom
          offset-y
      >
        <template v-slot:activator="{on}">
      <v-btn text
             v-on="on"
      >
        <div class="d-flex align-center">
          <v-icon  size="32">
            mdi-account-circle
          </v-icon>
          <div class="ml-1 subtitle-2">
            {{ name }}
          </div>
        </div>
      </v-btn>
        </template>

        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ name }}</h3>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text color="primary" @click="dialog=true">编辑信息</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text color="primary" @click="changepass=true">修改密码</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text color="primary" @click="signout">退 出</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

<!--  修改信息框    -->
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        v-model="mess.real"
                        label="姓名*"
                        required
                      :disabled="read"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        label="住址*"
                        v-model="mess.addr"
                        required
                        :disabled="read"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        label="手机号码*"
                        v-model="mess.phone"
                        required
                        :disabled="read"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="edit"
              >
                {{ read? "修 改":"保 存" }}
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
              >
                关 闭
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

<!--  修改信息提示框    -->
      <v-dialog  max-width="200px" v-model="show" >
        <v-card >
          <v-card-title class="headline">
            提示信息
          </v-card-title>
          <v-card-text>{{this.savemess}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="show = false"
            >
              了解
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
<!--  修改密码框    -->
      <v-dialog v-model="changepass" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Change Password</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show3 ? 'text' : 'password'"
                      v-model="oldPass"
                      label="旧密码*"
                      required
                      @click:append="show3 = !show3"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show4 ? 'text' : 'password'"
                      label="新密码*"
                      v-model="pass.newPass"
                      required
                      @click:append="show4 = !show4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                      :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show4 ? 'text' : 'password'"
                      label="确认新密码*"
                      v-model="confirmPass"
                      required
                      @click:append="show4 = !show4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="change_Pass"
            >保 存
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="changepass = false"
            >关 闭
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--  修改密码提示框    -->
      <v-dialog  max-width="200px" v-model="show2" >
        <v-card >
          <v-card-title class="headline">
            提示信息
          </v-card-title>
          <v-card-text>{{this.changePassMess}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="show2 = false ,  changepass = changePassMess=='修改成功'? false : true"
            >
              了解
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-app-bar>

    <v-main>
      <router-view />
      <v-footer>
        {{ new Date().getFullYear() }}
        <span class="ml-2">
          <strong
          ><a
              href="https://heroui.net"
              target="_blank"
              rel="noopener noreferrer"
          >HeroUI</a
          ></strong
          >
        </span>
      </v-footer>
    </v-main>
  </div>
</template>

<script>
export default {
  data (){
    return{
      savemess:null, show:false, show2:false,read:true, dialog:false,
      oldPass:null,confirmPass:null,changePassMess:null,changepass:false,show3:false,show4:false,
      name: this.$route.query.name,
      drawerDisplay: null,
      mess:{real:"", phone:"", addr:"", passwd:"",login:this.$route.query.name},
      pass:{newPass:"",login:this.$route.query.name},
      drawer: [
        {title: "收费管理", icon: "mdi-cash-100", to: "/user/charge",},
        {title: "维护公告", icon: "mdi-login", to: "/user/poster",},
        {title: "报修管理", icon: "mdi-face-profile", to: "/user/fix",},
        {title: "维护业主信息", icon: "mdi-home", to: "/user/custmess",},
      ],
    }
  },

  mounted() {
    this.drawerDisplay = this.$vuetify.breakpoint.lgAndDown ? false : true;
    this.query();
  },

  methods:{
    signout:function (){
      this.$router.push({ path:'/',});
    },
    query:function (){
      this.axios.post('/api/user/queryusermess', JSON.stringify({"name":this.name}),
      ).then(res => {//true
        this.mess.real=res.data["real"];this.mess.phone=res.data["phone"];this.mess.addr=res.data["addr"];this.mess.passwd=res.data["passwd"];
      }, res => {// 错误回调
        /*TODO 这里写啥？*/
        console.log(res);
      })
    },
    edit:function (){
      this.read = !this.read;
      if(this.read){
        this.axios.post('/api/user/saveusermess', JSON.stringify(this.mess),
        ).then(res => {//true
          this.savemess = res.data["mess"];
          this.show=true;
          this.query();
        }, res => {// 错误回调
          /*TODO 这里写啥？*/
          console.log(res);
        })
      }
    },
    change_Pass:function (){
      if(this.oldPass != this.mess.passwd){
        this.changePassMess = "旧密码错误，请重新输入";
        this.oldPass="";
        this.show2=true;
      }else if(this.confirmPass!= this.pass.newPass){
        this.changePassMess = "两次密码不一致，请重新输入";
        this.confirmPass="";
        this.pass.newPass="";
        this.show2=true;
      }else if(this.confirmPass== this.oldPass){
        this.changePassMess = "新密码与旧密码一致";
        this.confirmPass="";
        this.pass.newPass="";
        this.show2=true;
      }else{
        this.axios.post('/api/user/changeuserpass', JSON.stringify(this.pass),
        ).then(res => {//true
          this.changePassMess = res.data["mess"];
          this.show2=true;
          this.query();
          this.oldPass="";
          this.confirmPass="";
          this.pass.newPass="";
        }, res => {// 错误回调
          /*TODO 这里写啥？*/
          console.log(res);
        })
      }
    },
  },

};
</script>
