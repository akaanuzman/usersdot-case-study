import React from 'react';
import { Row, Col, Typography } from 'antd';
import PageSelectField from '../select/PageSelectField';

/**
 * @description - TableFooter component
 * @param {Object} props
 * @param {number} props.usersLength
 * @param {number} props.totalCount
 * @param {Function} props.handlePageSizeChange 
 * @returns - TableFooter component
 */
const TableFooter = ({ usersLength, totalCount, handlePageSizeChange }) => {
    return (
        <Row justify="space-between" align="middle">
            <Col>
                <Typography.Text> Showing {usersLength} of {totalCount} entries</Typography.Text>
            </Col>
            <Col>
                <PageSelectField handlePageSizeChange={handlePageSizeChange} />
            </Col>
        </Row>
    )
}

export default TableFooter