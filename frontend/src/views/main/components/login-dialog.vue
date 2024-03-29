<template>
  <el-dialog custom-class="login-dialog" title="로그인" v-model="state.dialogVisible" @close="handleClose">
    <img v-if="state.loading" src="https://i.imgur.com/JfPpwOA.gif">

    <el-form v-if="!state.loading" :model="state.form" :rules="state.rules" ref="loginForm" :label-position="state.form.align">
      <el-form-item prop="id" label="아이디" :label-width="state.formLabelWidth" >
        <el-input v-model="state.form.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="비밀번호" :label-width="state.formLabelWidth">
        <el-input v-model="state.form.password" autocomplete="off" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer v-if="!state.loading">
      <span class="dialog-footer">
        <el-button type="primary" @click="clickLogin">로그인</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'login-dialog',

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const store = useStore()
    // 마운드 이후 바인딩 될 예정 - 컨텍스트에 노출시켜야함. <return>
    const loginForm = ref(null)

    /*
      // Element UI Validator
      // rules의 객체 키 값과 form의 객체 키 값이 같아야 매칭되어 적용됨
      //
    */
    const state = reactive({
      form: {
        id: '',
        password: '',
        align: 'left'
      },
      rules: {
        id: [
          { required: true, message: '필수 입력 항목입니다.', trigger: 'blur' },
          { max: 16, message: '최대 16자까지 입력 가능합니다.'}
        ],
        password: [
          { required: true, message: '필수 입력 항목입니다.', trigger: 'blur' },
          {
            validator(rule, value, callback){
              if(!value)
                callback(new Error('필수 입력 항목입니다.'))
              if(value.length>16) //max
                callback(new Error('최대 16글자까지 입력 가능합니다.'))

              if(value.length<9)  //min
                callback(new Error('최소 9글자를 입력해야 합니다.'))

              if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,}$/.test(value)){
                callback()
              }
              else{
                callback(new Error('비밀번호는 영문, 숫자, 특수문자가 조합되어야 합니다.'))
              }
            }
          },
        ]
      },
      dialogVisible: computed(() => props.open),
      formLabelWidth: '120px',
      loading: false
    })

    onMounted(() => {
      // console.log(loginForm.value)
    })

    const clickLogin = function () {
      state.loading = true
      // 로그인 클릭 시 validate 체크 후 그 결과 값에 따라, 로그인 API 호출 또는 경고창 표시
      loginForm.value.validate((valid) => {
        if (valid) {
          // console.log('submit')
          store.dispatch('root/requestLogin', { userId: state.form.id, password: state.form.password })
            .then(res=>{
              // console.log(res.data)
              if(res.data.statusCode==200){
                localStorage.setItem("accessToken", res.data.accessToken)
                store.commit('root/SET_ACCESSTOKEN', res.data.accessToken)
                //emit('closeLoginDialog')
                window.location="/"
              }
              else if(res.data.statusCode==404){
                alert("해당 아이디가 존재하지 않습니다.")
              }
              state.form.id = ''
              state.form.password = ''
            }).then(()=>{
              state.loading = false
            })
            .catch(err=>{
              state.loading = false
              console.log(err)
              alert("아이디 또는 비밀번호가 틀렸습니다!")
            })
        } else {
          state.loading = false
          alert('필수 입력 항목을 적절히 입력하세요!')
        }
      });
    }

    const handleClose = function () {
      state.form.id = ''
      state.form.password = ''
      emit('closeLoginDialog')
    }

    return { loginForm, state, clickLogin, handleClose }
  }
}
</script>

<style>
.login-dialog {
  width: 400px !important;
  height: 300px;
}
.login-dialog .el-dialog__headerbtn {
  float: right;
}
.login-dialog .el-form-item__content {
  margin-left: 0 !important;
  float: right;
  width: 200px;
  display: inline-block;
}
.login-dialog .el-form-item {
  margin-bottom: 20px;
}
.login-dialog .el-form-item__error {
  font-size: 12px;
  color: red;
}
.login-dialog .el-input__suffix {
  display: none;
}
.login-dialog .el-dialog__footer {
  margin: 0 calc(50% - 80px);
  padding-top: 0;
  display: inline-block;
}
.login-dialog .dialog-footer .el-button {
  width: 120px;
}
</style>
