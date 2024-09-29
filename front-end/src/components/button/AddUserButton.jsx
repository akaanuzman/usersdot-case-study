import React from 'react'
import { Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

/**
 * @description - AddUserButton component
 * @param {Object} props
 * @param {Function} props.openModal
 * @returns - AddUserButton component
 */
const AddUserButton = ({openModal}) => {
    return (
        <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => openModal(null)}>
            Add User
        </Button>
    )
}

export default AddUserButton