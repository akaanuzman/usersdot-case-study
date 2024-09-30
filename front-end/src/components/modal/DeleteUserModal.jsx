import React, { useState } from 'react';
import { Modal, Button } from 'antd';

/**
 * DeleteUserModal component renders a modal to confirm the deletion of a user.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.visible - Determines if the modal is visible.
 * @param {Function} props.onConfirm - Function to call when the deletion is confirmed.
 * @param {Function} props.onCancel - Function to call when the deletion is canceled.
 *
 * @returns {JSX.Element} The rendered DeleteUserModal component.
 */
const DeleteUserModal = ({ visible, onConfirm, onCancel }) => {

    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        setLoading(true);
        await onConfirm();
        setLoading(false);
    }

    return (
        <Modal
            title="Confirm Deletion"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    danger
                    onClick={onClick}
                    loading={loading}
                >
                    Yes
                </Button>,
            ]}
        >
            <p>Are you sure you want to delete this user?</p>
        </Modal>
    );
};

export default DeleteUserModal;