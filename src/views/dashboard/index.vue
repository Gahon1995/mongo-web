<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div class="dashboard-text">
        <a class="label">姓名:</a>
        <a class="info">{{ user.name }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">性别:</a>
        <a class="info">{{ user.gender }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">邮箱:</a>
        <a class="info">{{ user.email }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">电话:</a>
        <a class="info">{{ user.phone }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">dept:</a>
        <a class="info">{{ user.dept }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">grade:</a>
        <a class="info">{{ user.grade }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">language:</a>
        <a class="info">{{ user.language }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">region:</a>
        <a class="info">{{ user.region }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">role:</a>
        <a class="info">{{ user.role }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">preferTags:</a>
        <a class="info">{{ user.preferTags }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">obtainedCredits:</a>
        <a class="info">{{ user.obtainedCredits }}</a>
      </div>
      <div class="dashboard-text">
        <a class="label">timestamp:</a>
        <a class="info">{{ user.timestamp }}</a>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box-card {
  max-width: 700px;
}

.label {
  // margin-right: 500px;
  display: inline-block;
  width: 250px;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
