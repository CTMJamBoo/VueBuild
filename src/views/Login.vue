<template>
    <div class="login">
        <div class="icons">
            <div @click="prev()" class="iconfont icon-xiangzuo"></div>
            <div class="register">
                <!-- 使用replace，跳转到注册页 -->
                <router-link  to="/register" replace>马上注册</router-link>
            </div>
        </div>
        <MyForm @submit="onLogin" usernamePH='请输入用户名或者手机号'>
            <template v-slot:header>
                <div class="title">登录商品账号</div>
            </template>
        </MyForm>
    </div>
</template>

<script>
    import MyForm from '@/components/MyForm.vue'
    export default {
        components:{
            MyForm
        },
        methods: {
             prev(){
                this.$router.go(-1)
            },
            //登录
            onLogin(data){
                //获取子组件传上来的用户名和密码
                const {username,password} = data

                //校验参数
                if(!(username&&password)){
                    this.$Toast('请将信息填写完整')
                    return false
                }

                //发出请求
                this.$axios.post('/native/api/login/t',{
                    username,password,tel:username
                })
                .then((res)=>{
                    const {code,msg,token} =res

                    if(code==1){
                        this.$Toast({
                            message:msg,
                            duration:1000
                        })

                        //将token存到localStorage
                          localStorage.setItem('token',token)
                        /*
                            假设我们只有一个页面A，现在使用$router跳转方法去到页面B
                            1.如果使用push，页面的历史记录会有两条
                            2、如果使用replace，页面的历史记录只有一条B，页面A会自动销毁

                            并且自动跳回上一页，有以下3种情况：

                           1、 当用户在首页，使用push跳到注册页，此时页面上有2条记录：首页+注册
                            注册成功时，使用replace跳转到登录页，此时页面上有2条记录：首页+登录
                            登录成功，回退上一页，就是首页

                           2、 当用户在首页，使用push跳转到登录页，此时页面上有2条记录：首页+登录
                            登录成功，回退上一页，就是首页

                            3、当用户在首页，使用push跳到登录页，此时页面上有2条记录：首页+登录
                            此时用户发现自己需要注册，就使用replace跳转到注册页，此时页面上有2条
                            记录：首页+注册
                            注册成功，使用replace跳转到登录页，此时页面上有2条记录：首页+登录
                            登录成功，回退上一页，就是首页
                        */
                       setTimeout(() => {
                            this.$router.back()
                       }, 1000);
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
    .myForm{
        height: 4rem;
    }
      .icons{
        height: 0.8rem;
        border-bottom: 1px solid #ddd;
        padding:0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        // width: 80%;
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