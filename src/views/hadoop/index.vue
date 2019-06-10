<template>
  <div>
    请选择上传的图片：
    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      action=""
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>

    <div class="editor-container">
      <dropzone
        id="myVueDropzone"
        url="https://httpbin.org/post"
        @dropzone-removedFile="dropzoneR"
        @dropzone-success="dropzoneS"
      />
    </div>

  </div>
</template>

<script>
import { Upload } from '@/api/hadoop.js'
import Dropzone from '@/components/Dropzone'

// import { URL } from 'url'
export default {
  components: { Dropzone },
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      // this.imageUrl = res.data.base64
      // console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      const fd = new FormData() // 通过form数据格式来传
      fd.append('picFile', file) // 传文件

      Upload(fd).then(res => {
        this.imageUrl = res.data.base64
        console.log(this.imageUrl)
        console.log('success')
      })
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
