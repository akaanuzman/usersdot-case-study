import React from 'react';
import { Modal, Button } from 'antd';

const DeleteUserModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            title="Confirm Deletion"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="confirm" type="primary" danger onClick={onConfirm}>
                    Yes
                </Button>,
            ]}
        >
            <p>Are you sure you want to delete this user?</p>
        </Modal>
    );
};

export default DeleteUserModal;