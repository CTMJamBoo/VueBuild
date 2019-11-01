<template>
    <div class="register">
         <div class="icons">
            <div @click="prev()" class="iconfont icon-xiangzuo"></div>
            <div class="login">
                <!-- 使用replace，跳转到注册页 -->
                <router-link  to="/login" replace>已有账号</router-link>
            </div>
        </div>
        <MyForm @reset="onReset" @submit="onRegister" usernamePH='请输入用户名'>
            <!--不同标签-->
            <template v-slot:header>
                <div class="title">注册商城账号</div>
            </template>

            <div class="row">
                <label for="tel" class="label"></label>
                <input type="number" class="ipt" id='tel' v-model="tel" placeholder="请输入正确的手机号"/>
            </div>

            <div class="row">
                <div class="getcode" :disabled="btnText!='获取验证码'" @click="getCode">{{btnText}}</div>
                <label for="code" class="label"></label>
                <input type="number" class="ipt" id='code' v-model="code" placeholder="请输入验证码"/>
            </div>
        </MyForm>
    </div>
</template>

<script>
    import MyForm from '@/components/MyForm.vue'
    export default {
        data(){
            return {
                tel:'',
                code:'',
                btnText:'获取验证码'
            }
        },
        //配置子组件
        components:{
            MyForm
        },
        methods: {
             prev(){
                this.$router.go(-1)
            },
            //重置信息
            onReset(){
                this.tel ='',
                this.code=''
            },
            //获取手机验证码
            getCode(){
                const tel = this.tel

                //校验手机号
                if(!/^1\d{10}$/.test(tel)){
                    this.$Toast('请输入正确的手机号码')
                    return false
                }
                //开始60秒倒计时
                let num=60
                let timer =setInterval(() => {
                    num -- 
                    if(num!=0){
                        this.btnText=`重新获取(${num})`
                    }else{
                        this.btnText = `获取验证码`
                        clearInterval(timer)
                    }
                }, 1000);

                //请求获取验证码
                this.$axios.post('/native/api/register/getCode',{
                    tel
                })
                .then((res)=>{
                    const {code,msg} = res

                    this.$Toast(msg)
                })
            },
              //注册
            onRegister(data){
                //获取子组件传上来的用户名和密码
                const {username,password} = data

                //获取当前组件中的手机号和验证码
                const {tel, code} =this

                //校验信息是否填写正确
                if(!(username&&password&&tel&&code)){
                    this.$Toast('请确保信息填写完整')
                    return false
                }

                //发送请求
                this.$axios.post('/native/api/register/useCode',{
                    username,password,tel,code
                })
                .then((res)=>{

                    const {code,msg}=res
                    if(code==1){
                        this.$Toast(msg)

                        //使用replace，跳转到登录页
                        this.$router.replace('/login')
                    }else{
                        this.$Toast(msg)
                    }
                })
            }
        },
      
    }
</script>
   
<style lang="scss" scoped>
    .title{
       font-size: 0.4rem;
    }
    .row{
        position: relative;
        .getcode{
            position: absolute;
            right: 0.3rem;
            top: 0.13rem;
            margin-left: 0.2rem;
            height: 0.5rem;
            color: brown;
            box-sizing: border-box;
            &.is-disabled{
                background-color: gray!important;
            }
        }
    }
     .icons{
        height: 0.8rem;
        border-bottom: 1px solid #ddd;
        padding:0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        .iconfont{
            height: 100%;
            line-height: 0.8rem;
            font-size: 0.5rem;
            color: brown;
            text-align: left;
            font-weight: 600;
        }
        a{
            text-decoration: none!important;
            color: #000;
            font-size: 0.3rem;
        }
    }
</style>



