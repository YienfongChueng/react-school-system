import { Button, Form, Input,notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../http/api'
import { setToken } from '../../utils/auth'
import { setRoleType } from '../../utils/role';
import md5 from 'md5'
import './index.css'
export default function Login(){
    const navigate = useNavigate()
    const [form] = Form.useForm(); //创建 Form 实例，用于管理所有数据状态。
    const handleLogin = ()=> {
        form.validateFields().then(value => {
            console.log(value)
            const params = {
                ...value,
                password: md5(value.password)
            }
            userLogin(params).then(res => {
                const { code,data} = res
                if(code === 20000) {
                    notification.open({
                        message: '登陆成功！',
                        duration: 2,
                        type:'success'
                    })
                    setToken(data.token)
                    setRoleType(data.user.type)
                    navigate('/home/index')
                }
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    const rules = {
        account: [
            {
                required: true,
                message: '请输入用户名!',
            },
        ],
        password:[
            {
                required: true,
                message: '请输入密码!',
            },
            {
                min: 3,
                max: 18,
                message: '输入3-18个字符!',
            }
        ]
    }

    const formEl = ()=> {
        return (
            <Form
                form = {form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    account: 'admin',
                    password: 'admin@123'

                }}
                autoComplete="off"
            >
                <Form.Item
                    name="account"
                    rules={rules.account}
                >
                    <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={rules.password}
                >
                    <Input.Password 
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="请输入密码"  />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button htmlType="submit" className="login-button" type="primary" onClick={handleLogin}>登 录</Button>
                </Form.Item>
            </Form>
        )
    }
    return (
        <div className="login">
            <div className="login-content ">
                <div className="login-form">
                    <p className="login-title">高校教务后台管理系统</p>
                    {formEl()}
                </div>
            </div>
        </div>
    )
}