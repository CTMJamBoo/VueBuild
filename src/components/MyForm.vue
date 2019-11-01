<template>
    <div class="myForm">
        <!--需要插入的头部，不同之处-->
        <slot name='header'>
            <div class="title">我是一个表单</div>
        </slot>

        <div class="row">
            <label for="username" class="label"></label>
            <input type="text" class="ipt" id='username' v-model="username" :placeholder="usernamePH" />
        </div>

        <div class="row">
            <label for="password" class="label"></label>
            <input type="password" class="ipt" id='password' v-model="password" placeholder="请输入密码"/>
        </div>

        <!--需要插入的其它内容，不同-->
        <slot />

        <!--底部操作按钮，相同-->
        <div class="btns">
            <mt-button @click="onSubmit" class="btn">提交</mt-button>
        </div>
    
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username:'',
                password:''
            }
        },
        props:['usernamePH'],
        methods: {
            //重置信息
            onReset(){
                this.username='',
                this.password=''

                //使用$emit向父组件发送消息
                this.$emit('reset')
            },
            //点击提交
          onSubmit(){
                const {username,password} = this

                // 第二个参数是消息的内容，也就是需要传给父组件的参数
                this.$emit('submit',{
                    username,
                    password
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .myForm{
        // margin: auto;
        margin-top: 1.2rem;
        // width: 80%;
        height: 6rem;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        align-items: center;//侧轴对齐
        box-sizing: border-box;
    }
    .title{
        text-align: center;
    }
    .row{
        height: 0.6rem;
        width: 5rem;
        .label{
            flex-shrink: 0;
        }
        .ipt{
            width: 100%;
            height: 100%;
            border-radius: 0.3rem;
            border: none;
            background-color: #eee;
            padding: 0 0.3rem;
            box-sizing: border-box;
            outline: none;
        }
    }

    .btns{
        .btn{
            width: 5rem;
            background-color: brown;
            height: 0.6rem;
            border-radius: 0.3rem;
            color: #eee;
        }
    }
</style>