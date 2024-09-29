import React from 'react';
import { Tag } from 'antd';

/**
 * UserRoleTag component displays a tag with a color based on the user's role.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.role - The role of the user.
 * @returns {JSX.Element} The UserRoleTag component.
 */
const UserRoleTag = ({ role }) => {
    const getRoleColor = () => {
        return role === 'admin' ? 'red' : 'green';
    };

    return (
        <Tag color={getRoleColor()}>{role.toUpperCase()}</Tag>
    );
};

export default UserRoleTag;