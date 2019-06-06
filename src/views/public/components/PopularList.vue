<template>
  <div>
    <sticky :sticky-top="20">
      <div
        class="popular"
        name='popular'
      >
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
          :v-loading='loading'
        >
          <!-- <transition-group
        name="list-complete"
        tag="p"
      > -->
          <!-- <div v-show="!loading"> -->
          <el-divider key="dividere"></el-divider>
          <div
            v-for="(item, index) in toplist"
            :key="item.aid"
            class="list-complete-item"
          >
            <el-row style="margin-left: 30px">
              <router-link :to="'/articles/'+item.aid + '?category=' + item.category">
                <el-col
                  :span="4"
                  style="font-size: 1.2rem;font-style: italic"
                > {{index + 1 }}. </el-col>
                <el-col :span="20">{{ item.title }}</el-col>
              </router-link>
            </el-row>
            <el-divider key="divider + item.aid"></el-divider>
          </div>
          <!-- </div> -->
          <!-- </transition-group> -->
        </el-card>

      </div>
    </sticky>
  </div>
</template>

<<script>
import Sticky from '@/components/Sticky'
import { getPublicPopulars } from '@/api/populars.js'

export default {
  components:{
    Sticky
  },
  data(){
    return {
      loading: false,
      buttons:{
        btn1: "primary",
        btn2:"",
        brn3:""
      },
      listQuery:{
        level: 'daily',
        dbms: 'Hong Kong',
        t: Date.parse(new Date(new Date(1516204800000).setHours(0, 0, 0, 0)))
      },
      toplist:[

      ]
    }
  },
  mounted() {
    this.fetchPopulars()
  },
  methods: {
    handleClick(region) {
      this.listQuery.dbms = region
      this.fetchPopulars()
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

      this.fetchPopulars()
      // console.log("dailyPopular")
    },
    weeklyPopular() {
      this.listQuery.level = 'weekly'
      this.resetBtn('btn2')

      this.fetchPopulars()
      // console.log("weeklyPopular")
    },
    monthlyPopular() {
      this.listQuery.level = 'monthly'
      this.resetBtn('btn3')

      this.fetchPopulars()
      // console.log("monthlyPopular")
    },
    fetchPopulars() {
      this.loading = true
      getPublicPopulars(this.listQuery).then(response => {
        this.toplist = response.data
        this.loading = false
      })
    },
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
  // margin-top: 100px;
}
.list-complete-item {
  transition: all 1s;
  // display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
