import React from 'react';
import { Tooltip, Button } from 'antd';
import PropTypes from 'prop-types';

/**
 * TableActionButtonWithTooltip component renders a button with a tooltip.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title for the tooltip.
 * @param {string} props.buttonType - The type of the button.
 * @param {React.ReactNode} props.icon - The icon to be displayed inside the button.
 * @param {function} props.onClick - The click handler function for the button.
 * @returns {JSX.Element} The rendered component.
 */
const TableActionButtonWithTooltip = ({ title, buttonType, icon, onClick, danger }) => {
    return (
        <Tooltip title={title}>
            <Button
                type={buttonType}
                shape="circle"
                icon={icon}
                onClick={onClick}
                danger={danger}
            />
        </Tooltip>
    );
};

TableActionButtonWithTooltip.propTypes = {
    title: PropTypes.string.isRequired,
    buttonType: PropTypes.string,
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    danger: PropTypes.bool
};

export default TableActionButtonWithTooltip;