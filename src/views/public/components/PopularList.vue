<template>
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
        :type="buttons.btn1"
        @click="dailyPopular"
      >
        今日热门
      </el-button>
      <el-button
        name="weekly"
        :type="buttons.btn2"
        @click="weeklyPopular"
      >
        一周热门
      </el-button>
      <el-button
        name="monthly"
        :type="buttons.btn3"
        @click="monthlyPopular"
      >
        本月热门
      </el-button>
    </el-button-group>
  </div>
</template>

<<script>
export default {
  data(){
    return {
      buttons:{
        btn1: "primary",
        btn2:"",
        brn3:""
      },
      listQuery:{
        level: 'daily'
      }
    }
  },
  methods: {
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
      // console.log("dailyPopular")
    },
    weeklyPopular() {
      this.listQuery.level = 'weekly'
      this.resetBtn('btn2')
      // console.log("weeklyPopular")
    },
    monthlyPopular() {
      this.listQuery.level = 'monthly'
      this.resetBtn('btn3')
      // console.log("monthlyPopular")
    }
  }
}
</script>
