<template>
  <v-img
      class="fill-height"
      src="https://img-1304904413.cos.ap-hongkong.myqcloud.com/2021/05/19/21:24:25.JPG"
      :aspect-ratio="16 / 9"
      height="100vh"
      width="100vw"
      gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
  >
    <v-container fill-height fluid>
      <v-row justify="center" align="center" class="fill-height">
        <v-col cols="12" md="8" lg="6" xl="4">
          <v-card elevation="12" class="py-8">
            <v-card-text class="text-center">
              <h2 class="text-h4 black--text font-weight-bold">
                物业管理系统
              </h2>
              <div class="mt-6">
                <v-row justify="center">
                  <v-col cols="12" md="10">
                    <v-radio-group
                        v-model="signin.choose"
                        row
                        mandatory
                    >
                      <v-radio
                          label="管理员"
                          value="admin"
                      ></v-radio>
                      <v-radio
                          label="业主"
                          value="houser"
                      ></v-radio>
                    </v-radio-group>
                    <v-text-field
                        label="输入您的账号"
                        solo
                        flat
                        outlined
                        prepend-inner-icon="mdi-account-outline"
                        hide-details
                        v-model="signin.account"
                        :error-messages="signnameErrors"
                        @input="$v.signin.account.$touch()"
                        @blur="$v.signin.account.$touch()"
                    ></v-text-field>

                    <v-text-field
                        label="Password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        solo
                        flat
                        outlined
                        prepend-inner-icon="mdi-lock-open"
                        hide-details
                        class="mt-6"
                        v-model="signin.passwd"
                        :error-messages="signpdErrors"
                        @input="$v.signin.passwd.$touch()"
                        @blur="$v.signin.passwd.$touch()"
                    ></v-text-field>


                    <div class="mt-6">
                      <v-btn block class="text-capitalize" large color="primary" @click="asd"
                      >登 录
                      </v-btn
                      >
                    </div>

                    <v-dialog  max-width="200px" v-model="show" >
                    <v-card >
                      <v-card-title class="headline">
                        错误信息
                      </v-card-title>
                      <v-card-text>{{mess}}</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="error"
                            text
                            @click="show = false"
                        >
                          了 解
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                    </v-dialog>

                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
import { required} from 'vuelidate/lib/validators'
import {validationMixin} from "vuelidate";
export default {
  mixins: [validationMixin],
  validations: {
    signin:{
      account:{required},
      passwd:{required},
    }
  },
  computed: {
    signnameErrors () {
      const errors = []
      if (!this.$v.signin.account.$dirty) return errors
      !this.$v.signin.account.required && errors.push('详情不可为空')
      return errors
    },
    signpdErrors(){
      const errors = []
      if (!this.$v.signin.passwd.$dirty) return errors
      !this.$v.signin.passwd.required && errors.push('详情不可为空')
      return errors
    }
  },
  data () {
    return {
      url: process.env.VUE_APP_API,
      show1:false,
      signin:{
        choose:"",
        account:"",
        passwd:"",
      },
      checkbox: true,
      show:false,
      mess:"",
    }
  },
  methods:{
    asd:function (){
      if(this.$v.$invalid||this.$v.$error){
        this.$v.$touch()
      }
      else {
        this.axios.post(this.url + 'common/signin', JSON.stringify(this.signin)
        ).then(res => {//true
          if (res.data["flag"] === "error") {
            this.mess = res.data["mess"];
            this.show = true;
          } else if (res.data["flag"] === "success") {
            if (res.data["mess"] === "admin") {
              if (res.data["root"] ===1) {
                window.sessionStorage.setItem('identity', '0');
              } else {
                window.sessionStorage.setItem('identity', '1');
              }
              window.sessionStorage.setItem('loginname', this.signin.account);
              window.sessionStorage.setItem('name', res.data["name"]);
              this.$router.push({
                path: '/user/',
                query: {
                  name: res.data["name"],
                }
              });
            } else if (res.data["mess"] === "cust") {
              window.sessionStorage.setItem('identity', '2');
              window.sessionStorage.setItem('loginname', this.signin.account);
              window.sessionStorage.setItem('name', res.data["name"]);
              this.$router.push({
                path: '/cust/',
                query: {
                  name: res.data["name"],
                }
              });
            }
          }
        }, res => {// 错误回调
          /*TODO 这里写啥？*/
          console.log(res);
        })
      }
    },
  },
}
</script>