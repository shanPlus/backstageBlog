<template>
  <div class='login_container'>
    <div class="avatar_box">
      <img :src="imgSrc" alt="头像">
    </div>
    <div class="form_box">
      <!--所有的表单数据都在:model=form属性身上 rules表单内容验证 prop校验字段名 ref获取表单实例对象进行预验证-->
      <el-form label-width="60px" prop="username" :model="loginForm" :rules="rules" ref="ruleFormRef" hide-required-asterisk>
        <el-form-item label="登录名: " prop="username">
          <el-input v-model.trim="loginForm.username" clearable placeholder="请输入用户名或邮箱登录"></el-input>
        </el-form-item>
        <el-form-item label="密  码: " prop="password">
          <el-input v-model.trim="loginForm.password" clearable show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="success" @click="register">注册</el-button>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import imgSrc from '../assets/logo.png'
export default {
  name: 'Login',
  data () {
    return {
      imgSrc: imgSrc,
      loginForm: { username: 'admin@qq.com', password: '123456' },
      rules: {
        username: { required: true, message: '请输入登录名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  mounted () {
    // 如果登录状态进入登录页面就会清楚token
    localStorage.removeItem('token')
  },
  methods: {
    register () {
      // 点击注册按钮就会清除token
      localStorage.removeItem('token')
      console.log(this.$router.push('/register'))
    },
    async submitForm () {
      // validate 提交对表单进行验证， 参数是回调函数
      this.$refs.ruleFormRef.validate(async valid => {
        if (!valid) return
        // console.log(this.loginForm.username, valid)
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        window.localStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped>
.login_container {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 300px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 1px 1px 5px 2px #DBDADA ;
  border-radius: 5px;
  transform: translate(-50%,-50%);
}
.avatar_box {
  display: flex;
  justify-content: center;
}
.avatar_box img {
  width: 100px;
  height: 100px;
}
.el-button {
  float: right;
  margin: 10px 10px 0 0;
}
</style>
