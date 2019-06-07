<template>
  <div>
    <EditUser
      :visiable.sync="dialogVisiable"
      :action="dialogAction"
      :title="dialogTitle"
      @submit="HandleSubmit"
    />
  </div>
</template>

<script>
import EditUser from '@/views/users/components/EditUser'
import { register } from '@/api/user.js'

export default {
  components: { EditUser },
  data() {
    return {
      dialogAction: 'register',
      dialogVisiable: true,
      dialogUser: null,
      dialogTitle: '用户注册'
    }
  },
  watch: {
    dialogVisiable: function(newState, oldState) {
      if (!newState) {
        this.$router.push({ path: '/login' })
      }
    }
  },
  methods: {
    HandleRegister() {
      this.dialogVisiable = true
    },
    HandleSubmit(info) {
      console.log(this.dialogUser)
      if (this.dialogAction === 'register') {
        register(info).then(response => {
          if (response.code === 200) {
            this.$message({
              type: 'success',
              message: '注册成功,请登录'
            })
            this.dialogVisiable = false
          } else {
            this.dialogVisiable = true
          }
        })
      }
    }
  }
}
</script>
