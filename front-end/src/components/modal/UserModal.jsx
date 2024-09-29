import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message, InputNumber } from 'antd';

const { Option } = Select;

const UserModal = ({ visible, onClose, onSubmit, userId }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await fetch(`http://localhost:3001/users/${userId}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching user data: ${response.statusText}`);
                    }
                    const data = await response.json();
                    form.setFieldsValue(data);
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            } else {
                form.resetFields();
            }
        };

        fetchUserData();
    }, [userId, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const url = userId ? `http://localhost:3001/users/update` : 'http://localhost:3001/users/save';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userId ? { ...values, id: userId } : values),
            });

            if (!response.ok) {
                throw new Error(`Error saving user: ${response.statusText}`);
            }

            message.success('User saved successfully!');
            onSubmit(values);
            onClose();
            form.resetFields();
        } catch (error) {
            if (error.name === 'Error') {
                message.error(error.message);
            } else {
                message.error('Please fill in the required fields correctly.');
            }
        }
    };

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    return (
        <Modal
            title={userId ? "Edit User" : "Add User"}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: 'Please input the name!' },
                        { max: 50, message: 'Name cannot be longer than 50 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="surname"
                    label="Surname"
                    rules={[
                        { required: true, message: 'Please input the surname!' },
                        { max: 50, message: 'Surname cannot be longer than 50 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-Mail"
                    rules={[
                        { required: true, type: 'email', message: 'Please input a valid email!' },
                        { max: 100, message: 'E-Mail cannot be longer than 100 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                {!userId && (
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: 'Please input the password!' },
                            { max: 100, message: 'Password cannot be longer than 100 characters!' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                )}
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                        { required: true, message: 'Please input the phone number!' },
                        { max: 15, message: 'Phone number cannot be longer than 15 characters!' },
                        { pattern: /^\d+$/, message: 'Phone number must be a number!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        { type: 'number', message: 'Age must be a number!' }
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                        { max: 100, message: 'Country cannot be longer than 100 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="district"
                    label="District"
                    rules={[
                        { max: 100, message: 'District cannot be longer than 100 characters!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                        { required: true, message: 'Please select the role!' },
                        { max: 10, message: 'Role cannot be longer than 10 characters!' }
                    ]}
                >
                    <Select>
                        <Option value="user">User</Option>
                        <Option value="admin">Admin</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;