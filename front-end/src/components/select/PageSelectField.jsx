import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

/**
 * @description - PageSelectField component
 * @param {Object} props
 * @param {Function} props.handlePageSizeChange  
 * @returns - PageSelectField component
 */
const PageSelectField = ({ handlePageSizeChange }) => {
    const pages = [2, 5, 10, 15, 20, 25, 50, 100];
    return (
        <Select
            showSearch
            defaultValue={10}
            onChange={handlePageSizeChange}
        >
            {pages.map((page) =>
                <Option key={page} value={page}>
                    {`${page} / page`}
                </Option>
            )}
        </Select>
    )
}

export default PageSelectField