<template>
  <div>
    <el-card label-width="120px">
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <el-input style="width:400px" v-model="reqForm.title" placeholder="请输入5~30个字符"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本编辑器 -->
          <quill-editor v-model="reqForm.content" ref="myQuillEditor" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="reqForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 自定义封装组件 -->
          <div v-if="reqForm.cover.type===1">
            <my-image v-model="reqForm.cover.images[0]"></my-image>
          </div>
          <div v-if="reqForm.cover.type===3">
            <my-image v-model="reqForm.cover.images[0]"></my-image>
            <my-image v-model="reqForm.cover.images[1]"></my-image>
            <my-image v-model="reqForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="reqForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      reqForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      // 富文本编辑器配置
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], //  引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], //  列表
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            ['image'] // 上传图片、上传视频
          ]
        }
      }
    }
  },
  methods: {
    async submit (draft) {
      await this.$http.post(`/articles?draft=${draft}`, this.reqForm)
      if (draft) {
        this.$message.success('存为草稿成功')
      } else {
        this.$message.success('文章发表成功')
      }
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
