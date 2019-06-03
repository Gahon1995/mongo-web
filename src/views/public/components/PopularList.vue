<template>
  <div class="popular">
    <div align="center">
      <!-- <el-tabs
      v-model="listQuery.level"
      :stretch="true"
      style="margin-bottom: 20px; width: 50%; align=center"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="今日热门"
        name="daily"
      />
      <el-tab-pane
        label="一周热门"
        name="weekly"
      />
      <el-tab-pane
        label="一月热门"
        name="monthly"
      />
    </el-tabs> -->

      <el-button-group>
        <el-button
          name="daily"
          plain
          :type="buttons.btn1"
          @click="dailyPopular"
        >
          今日热门
        </el-button>
        <el-button
          name="weekly"
          plain
          :type="buttons.btn2"
          @click="weeklyPopular"
        >
          一周热门
        </el-button>
        <el-button
          name="monthly"
          plain
          :type="buttons.btn3"
          @click="monthlyPopular"
        >
          本月热门
        </el-button>
      </el-button-group>
    </div>

    <el-card
      style="margin-top:30px; max-width:800px;margin:30px auto;"
      v-loading='loading'
    >
      <el-divider></el-divider>
      <div
        v-for="(item, index) in 10"
        :key="item"
      >
        <el-row style="margin-left: 30px">
          <el-col
            :span="4"
            style="font-size: 1.2rem;font-style: italic"
          > {{index + 1 }}. </el-col>
          <el-col :span="20">title{{ item }}</el-col>
        </el-row>
        <el-divider></el-divider>

      </div>
    </el-card>

  </div>
</template>

<<script>
export default {
  data(){
    return {
      loading: false,
      buttons:{
        btn1: "primary",
        btn2:"",
        brn3:""
      },
      listQuery:{
        level: 'daily'
      },
      toplist:[

      ]
    }
  },
  methods: {
    handleClick(region) {
      this.listQuery.dbms = region
      // console.log(region)
    },
    resetBtn(btn) {
      this.buttons.btn1 = ""
      this.buttons.btn2 = ""
      this.buttons.btn3 = ""

      if (btn === 'btn1') {
        this.buttons.btn1 = "primary"
      }
      else if(btn === 'btn2') {
        this.buttons.btn2 = "primary"
      }
      else if(btn === 'btn3') {
        this.buttons.btn3 = "primary"
      }
    },
    dailyPopular() {
      this.listQuery.level = 'daily'
      this.resetBtn('btn1')

      this.loading = true
      // console.log("dailyPopular")
    },
    weeklyPopular() {
      this.listQuery.level = 'weekly'
      this.resetBtn('btn2')

      this.loading = true
      // console.log("weeklyPopular")
    },
    monthlyPopular() {
      this.listQuery.level = 'monthly'
      this.resetBtn('btn3')

      this.loading = true
      // console.log("monthlyPopular")
    }
  }
}
</script>

<style lang="scss">
.popular {
  // position: fixed;
  // top: 0px;
  // left: 0px;
  // right: 0px;
  // bottom: 0px;
  margin-top: 100px;
}
</style>
