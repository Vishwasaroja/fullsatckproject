import React from 'react'
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom"
import { LoginrUser } from '../../api/user';





function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values);
        try {
            const response = await LoginrUser(values);
            if (response.success) {
                console.log(response.message);
                message.success(response.message);
                localStorage.setItem('token', response.data);
                navigate("/");
            } else {
                console.log(response.message);
                message.error(response.message);
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }
    return (
        <>
            <main className='App-header'>
                <h1>Login to Book MyShow</h1>
                <section className='main-area mw-500 text-center px-3'>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[{ required: true, message: "Email is required" }]}
                        >
                            <Input type="text" id='email' placeholder='Enter your Email' />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            htmlFor="password"
                            name="password"
                            className="d-block"
                            rules={[{ required: true, message: "Password is required" }]}
                        >
                            <Input type="text" id='email' placeholder='Enter your Password' />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' block htmlType='submit'
                                style={{ fontSize: "1rem", fontWeight: '600' }}
                            >Login</Button>
                        </Form.Item>

                    </Form>
                    <div>
                        <p>
                            New User ? <Link to="/register">Register Here</Link>
                        </p>
                        <p>
                            Forgot Password? <Link to="/forget">Click Here</Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login
