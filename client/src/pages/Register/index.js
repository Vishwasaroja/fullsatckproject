import React from 'react'
import { Button, Form, Input, message, Radio } from "antd";
import { Link } from "react-router-dom"
import { RegisterUser } from '../../api/user';
import FormItem from 'antd/es/form/FormItem';
function Register() {
    const onFinish = async (values) => {
        try {
            const response = await RegisterUser(values);

            if (response.success) {
                message.success(response.message);
            } else {
                message.error(response.message)
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }
    return (
        <>
            <main className='App-header'>
                <h1>Register to Book MyShow</h1>
                <section className='main-area mw-500 text-center px-3'>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            label="Name"
                            htmlFor="name"
                            name="name"
                            className="d-block"
                            rules={[{ required: true, message: "Name is required" }]}
                        >
                            <Input type="text" id='name' placeholder='Enter your Name' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[{ required: true, message: "Email is required" },
                            { type: 'email', message: "Enter valid email" }
                            ]}
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
                            >Register</Button>
                        </Form.Item>
                        <FormItem
                            label="Register as a partner"
                            htmlFor='role'
                            name="role"
                            className='d-block text-center'
                            initialValue={false}
                            roles={[{
                                required: true,
                                message: "Please select an option"
                            }]}
                        >
                            <div className='d-flex justify-content-start'>
                                <Radio.Group name="radiogroup" className="flex-start">
                                    <Radio value={'partner'} >Yes</Radio>
                                    <Radio value={'user'} >No</Radio>
                                </Radio.Group>
                            </div>
                        </FormItem>
                    </Form>
                    <div>
                        <p>
                            Already User ? <Link to="/login">Login Here</Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Register
