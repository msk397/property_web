<template>
  <v-img
      class="fill-height"
      src="../../static/img/background.jpg"
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
                欢迎登陆物业管理系统
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
                    ></v-text-field>

                    <v-text-field
                        label="Password"
                        type="password"
                        solo
                        flat
                        outlined
                        prepend-inner-icon="mdi-lock-open"
                        hide-details
                        class="mt-6"
                        v-model="signin.passwd"
                    ></v-text-field>

                    <div class="d-flex align-center justify-space-between mt-4">
                      <v-checkbox label="Remember me"></v-checkbox>

                      <div class="primary--text text-subtitle-1">
                        Lost password?
                      </div>
                    </div>

                    <div class="mt-6">
                      <v-btn block class="text-capitalize" large color="primary" @click="asd"
                      >sign in
                      </v-btn
                      >
                    </div>
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
export default {
  data () {
    return {
      signin:{
        choose:"",
        account:"",
        passwd:"",
      },
      checkbox: true,
    }
  },
  methods:{
    asd:function (){
      console.log(this.signin);
      console.log(JSON.stringify(this.signin));
      this.axios.post('/api/common/signin', JSON.stringify(this.signin)
      ).then(res => {//true
            console.log(res);
          }, res => {// 错误回调
            console.log("error");
            console.log(res);
          })
    }
  },

}
</script>