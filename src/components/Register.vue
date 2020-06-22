<template>
    <div>
      <el-form :model="register" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户名: " prop="username" >
          <el-input v-model.trim="register.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱: " prop="email">
          <el-input v-model.trim="register.email" clearable placeholder="唯一凭证请认真填写"></el-input>
        </el-form-item>
        <el-form-item label="密码: " prop="password">
          <el-input v-model.trim="register.password" clearable show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="重新输入密码: " prop="passwords" >
          <el-input v-model.trim="register.passwords" clearable show-password placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm()">确认注册</el-button>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    const validateUser = (rule, value, callback) => {
      // 用户名不能包含
      const userRegExp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
      if (!userRegExp.test(value)) return callback(new Error('用户名不能包含符号'))
      callback()
    }
    const validatePasss = (rule, value, callback) => {
      if (!(this.register.password === value)) return callback(new Error('两次密码不一致, 请重新输入'))
      callback()
    }
    return {
      register: {
        username: '纳米6062',
        email: '424433081@gmail.com',
        password: '424433081',
        passwords: '424433081'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在3-6位之间', trigger: 'blur' },
          { validator: validateUser, trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: '7', message: '密码长度需大于7', trigger: 'blur' }
        ],
        passwords: [
          { required: true, message: '请再次输入密码', trigger: ['blur', 'change'] },
          { validator: validatePasss, trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  mounted () {
    // 如果登录状态进入登录页面就会清楚token
    localStorage.removeItem('token')
  },
  methods: {
    async submitForm () {
      this.$refs.ruleFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/register', this.register)
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
        window.localStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style scoped>
form {
  margin: 10px;
}
button {
  width: 100%
}
</style>
