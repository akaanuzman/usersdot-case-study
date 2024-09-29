import React from 'react';
import { Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TableActionButtonWithTooltip from '../button/TableActionButtonWithTooltip';

/**
 * TableActions component renders action buttons for editing and deleting table rows.
 * 
 * @component
 * @example
 * return (
 *   <TableActions />
 * )
 */
const TableActions = () => {
    return (
        <Space size="middle">
            <TableActionButtonWithTooltip
                title="Edit"
                buttonType="primary"
                icon={<EditOutlined />}
                onClick={() => { }}
            />
            <TableActionButtonWithTooltip
                title="Delete"
                buttonType="primary"
                icon={<DeleteOutlined />}
                onClick={() => { }}
                danger
            />
        </Space>
    );
}

export default TableActions;