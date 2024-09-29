import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

/**
 * @description - SearchInput component
 * @param {Object} props
 * @param {Function} props.handleSearch
 * @returns - SearchInput component
 */
const SearchInput = ({handleSearch}) => {
    return (
        <Search
            addonBefore={<SearchOutlined />}
            placeholder="Search User..."
            enterButton="Search"
            size="large"
            onSearch={(value) => handleSearch(value)}
        />
    )
}

export default SearchInput