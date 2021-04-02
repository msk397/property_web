<template>
  <v-img
      class="fill-height"
      src="https://cdn.pixabay.com/photo/2015/06/08/15/11/typewriter-801921_1280.jpg"
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
              <v-card class="mx-auto" max-width="500">
                <v-list shaped>
                  <v-list-item-group v-model="model">
                    <template v-for="(item, i) in items">
                      <v-divider
                          v-if="!item"
                          :key="`divider-${i}`"
                      ></v-divider>

                      <v-list-item
                          v-else
                          :key="`item-${i}`"
                          :value="item"
                          active-class="deep-blue--text text--accent-4"
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-content>
                            <v-list-item-title v-text="item"></v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                                :input-value="active"
                                color="blue light-1"
                            ></v-checkbox>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
              <div class="mt-6">
                <v-row justify="center">
                  <v-col cols="12" md="10">

                    <v-text-field
                        label="输入您的账号"
                        solo
                        flat
                        outlined
                        prepend-inner-icon="mdi-account-outline"
                        hide-details
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

                    <div class="mt-6">
                      <span class="text-subtitle-1">
                        or login with
                      </span>

                      <div class="mt-2">
                        <v-btn color="light-blue" icon large>
                          <v-icon large>
                            mdi-twitter
                          </v-icon>
                        </v-btn>

                        <v-btn color="indigo" icon large>
                          <v-icon large>
                            mdi-facebook
                          </v-icon>
                        </v-btn>

                        <v-btn color="red" icon large>
                          <v-icon large>
                            mdi-google
                          </v-icon>
                        </v-btn>
                      </div>

                      <div class="mt-6">
                        Not registered?
                        <span class="primary--text text-subtitle-1"
                        >Create account</span
                        >
                      </div>
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
  data: () => ({
    items: [
      '管理员',
      '',
      '业主',
    ],
    model: ['Carrots'],
  }),
  methods:{
    asd:function (){
      this.axios.get('/api')
          .then(res => {
            //true
            console.log(res);
          }, res => {
            // 错误回调
            console.log("error");
            console.log(res);
          })
    }
  }
}
</script>