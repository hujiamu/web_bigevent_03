$(function () {
    // 点击按钮 显示隐藏
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //  密码验证
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //  校验两次密码的值是否一致
        repwd: function (value) {
            var pwd = $('.reg_box input[name=password]').val()
            if (value != pwd) return '两次密码不一致'
        }
    })

    // 监听注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg_box input[name=username]').val(),
                password: $('.reg_box input[name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#form_reg')[0].reset()
                $('#link_login').click()
            }
        })
    })

    // 监听登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})