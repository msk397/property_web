<template>
  <div>
    <v-navigation-drawer
        app
        :mini-variant="$vuetify.breakpoint.lgAndDown"
        expand-on-hover
        v-model="drawerDisplay"
        bottom
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

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{on}">
      <v-btn text v-on="on">
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
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                        label="住址*"
                        v-model="mess.addr"
                        required
                        :disabled="read"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                        label="手机号码*"
                        v-model="mess.phone"
                        required
                        :disabled="read"
                        counter="11"
                        :error-messages="phoneErrors"
                        @input="$v.mess.phone.$touch()"
                        @blur="$v.mess.phone.$touch()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>带*为必填项</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="edit">{{ read? "修 改":"保 存" }}</v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false ;read=true">关 闭</v-btn>
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
            <v-btn color="green darken-1" text @click="show = false">了 解</v-btn>
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
                      v-model="pass.oldPass"
                      label="旧密码*"
                      required
                      @click:append="show3 = !show3"
                      :error-messages="opErrors"
                      @input="$v.pass.oldPass.$touch()"
                      @blur="$v.pass.oldPass.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show4 ? 'text' : 'password'"
                      label="新密码*"
                      v-model="pass.newPass"
                      required
                      @click:append="show4 = !show4"
                      :error-messages="npErrors"
                      @input="$v.pass.newPass.$touch()"
                      @blur="$v.pass.newPass.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                      :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show4 ? 'text' : 'password'"
                      label="确认新密码*"
                      v-model="pass.confirmPass"
                      required
                      @click:append="show4 = !show4"
                      :error-messages="cpErrors"
                      @input="$v.pass.confirmPass.$touch()"
                      @blur="$v.pass.confirmPass.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>带*为必填项</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="change_Pass">保 存</v-btn>
            <v-btn color="blue darken-1" text @click="close">关 闭</v-btn>
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
                @click="show2 = false , changepass = changePassMess=='修改成功'? false : true"
            >
              了解
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required,maxLength,minLength,numeric} from 'vuelidate/lib/validators'
import { mdiAccountCircle,mdiPost,mdiHammerScrewdriver} from '@mdi/js'
export default {
  data (){
    return{
      savemess:null, show:false, show2:false,read:true, dialog:false,
      changePassMess:null,changepass:false,show3:false,show4:false,
      name: window.sessionStorage.getItem('name'),
      drawerDisplay: null,
      mess:{real:"", phone:"", addr:"", passwd:"",login:window.sessionStorage.getItem('loginname')},
      pass:{oldPass:"",confirmPass:"",newPass:"",login:window.sessionStorage.getItem('loginname')},
      drawer: [
        {title: "首页", icon: "mdi-home", to: "/user",},
        {title: "业主信息", icon: mdiAccountCircle, to: "/user/custmess",},
        {title: "收费管理", icon: "mdi-cash-100", to: "/user/charge",},
        {title: "报修管理", icon: mdiHammerScrewdriver, to: "/user/fix",},
        {title: "公告管理", icon: mdiPost, to: "/user/poster",},
      ],
    }
  },

  mixins: [validationMixin],
  validations: {
    mess: {
      phone:{required,minLength:minLength(11),maxLength:maxLength(11),numeric},
    },
    pass:{
      oldPass: {required,minLength:minLength(8)},
      newPass: {required,minLength:minLength(8)},
      confirmPass: {required,minLength:minLength(8)},
    }
  },

  computed: {
    phoneErrors() {
      const errors = []
      if (!this.$v.mess.phone.$dirty) return errors
      !this.$v.mess.phone.maxLength && errors.push('请输入11位格式手机号')
      !this.$v.mess.phone.minLength && errors.push('请输入11位格式手机号')
      !this.$v.mess.phone.numeric && errors.push('手机号仅支持数字输入')
      !this.$v.mess.phone.required && errors.push('手机号不可为空')
      return errors
    },
    opErrors(){
      const errors = []
      if (!this.$v.pass.oldPass.$dirty) return errors
      !this.$v.pass.oldPass.minLength && errors.push('密码至少8位字符')
      !this.$v.pass.oldPass.required && errors.push('密码不可为空')
      return errors
    },
    npErrors(){
      const errors = []
      if (!this.$v.pass.newPass.$dirty) return errors
      !this.$v.pass.newPass.minLength && errors.push('密码至少8位字符')
      !this.$v.pass.newPass.required && errors.push('密码不可为空')
      return errors
    },
    cpErrors(){
      const errors = []
      if (!this.$v.pass.confirmPass.$dirty) return errors
      !this.$v.pass.confirmPass.minLength && errors.push('密码至少8位字符')
      !this.$v.pass.confirmPass.required && errors.push('密码不可为空')
      return errors
    },
    },

  mounted() {
    this.drawerDisplay = this.$vuetify.breakpoint.lgAndDown ? false : true;
    this.query();
  },

  methods:{
    close () {
      this.pass.oldPass="";
      this.pass.confirmPass="";
      this.pass.newPass="";
      this.changepass = false
      this.$v.$reset()
    },
    signout:function (){
      this.$router.push({ path:'/',});
    },
    query:function (){
      this.axios.post('/api/user/queryusermess', JSON.stringify({"name":window.sessionStorage.getItem('loginname')}),
      ).then(res => {//true
        this.mess.real=res.data["real"];this.mess.phone=res.data["phone"];this.mess.addr=res.data["addr"];this.mess.passwd=res.data["passwd"];
      }, res => {// 错误回调
        /*TODO 这里写啥？*/
        console.log(res);
      })
    },
    edit:function (){
      /*处于只读状态*/
        if (this.read) {
          this.read = !this.read;
      }/*处于修改状态*/
        else{
          if(this.$v.$invalid||this.$v.$error){
            this.$v.$touch()
          }
          else {
            this.axios.post('/api/user/saveusermess', JSON.stringify(this.mess)).then(res => {//true
              this.savemess = res.data["mess"];
              this.show = true;
              this.query();
            }, res => {// 错误回调
              /*TODO 这里写啥？*/
              console.log(res);
            })
            this.read = !this.read;
          }
        }
    },
    change_Pass:function (){
      if(this.$v.$invalid||this.$v.$error){
        this.$v.$touch()
      }
      else {
        this.axios.post('/api/user/changeuserpass', JSON.stringify(this.pass),
        ).then(res => {//true
          this.changePassMess = res.data["mess"];
          this.show2=true;
          this.query();
          this.pass.oldPass="";
          this.pass.confirmPass="";
          this.pass.newPass="";
        })
        this.close()
      }
    },
  },
};
</script>
