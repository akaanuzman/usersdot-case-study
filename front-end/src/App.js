import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Tooltip, Tag, Row, Col, Typography, Select } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';

const { Option } = Select;

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users?page=${currentPage}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error(`status: ${response.status}`);
      }
      const result = await response.json();
      setUsers(result.users);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const openModal = (record) => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Table
        dataSource={users}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Surname', dataIndex: 'surname', key: 'surname' },
          { title: 'E-Mail', dataIndex: 'email', key: 'email' },
          { title: 'Phone', dataIndex: 'phone', key: 'phone' },
          { title: 'Age', dataIndex: 'age', key: 'age' },
          { title: 'Country', dataIndex: 'country', key: 'country' },
          { title: 'District', dataIndex: 'district', key: 'district' },
          {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
              <Tag color={role === 'admin' ? 'red' : 'green'}>{role.toUpperCase()}</Tag>
            )
          },
          {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Tooltip title="Edit">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => { }}
                  />
                </Tooltip>
                <Tooltip title="Delete">
                  <Button
                    type="primary"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={() => { }}
                  />
                </Tooltip>
              </div>
            ),
          },
        ]}
        bordered
        pagination={{
          current: currentPage,
          total: totalCount,
          pageSize: pageSize,
          onChange: (page) => setCurrentPage(page),
        }}
        onChange={handleTableChange}
        title={() =>
          <div>
            <Col>
              <Typography.Title>Usersdot Study Case</Typography.Title>
              <Row justify="space-between" align="middle">
                <Col>
                  <Input
                    placeholder="Search Users"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => openModal(null)}>
                    Add User
                  </Button>
                </Col>
              </Row>
            </Col>
          </div>}
        footer={() => (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography.Text> Showing {users.length} of {totalCount} entries</Typography.Text>
            <Select defaultValue={10} onChange={handlePageSizeChange} style={{ width: 120 }}>
              <Option value={2}>2 / page</Option>
              <Option value={5}>5 / page</Option>
              <Option value={10}>10 / page</Option>
              <Option value={15}>15 / page</Option>
              <Option value={20}>20 / page</Option>
              <Option value={25}>25 / page</Option>
              <Option value={50}>50 / page</Option>
              <Option value={100}>100 / page</Option>
            </Select>
          </div>
        )}
      />
      <Modal
        title={"Add User"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
      </Modal>
    </div>
  );
};

export default App;