import React from 'react';
import { Row, Col, Typography } from 'antd';
import SearchInput from '../input/SearchInput';
import AddUserButton from '../button/AddUserButton';

/**
 * @description - TableHeader component
 * @param {Object} props
 * @param {Function} props.handleSearch
 * @param {Function} props.openModal
 * @returns - TableHeader component
 */
const TableHeader = ({ handleSearch, openModal }) => {
    return (
        <Col>
            <Typography.Title>Usersdot Study Case</Typography.Title>
            <Row justify="space-between" align="middle">
                <Col>
                    <SearchInput handleSearch={handleSearch} />
                </Col>
                <Col>
                    <AddUserButton openModal={openModal} />
                </Col>
            </Row>
        </Col>
    );
};

export default TableHeader;