import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Tooltip, Space, Tag, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (!response.ok) {
        throw new Error(`status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      setData(result.users);
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

  return (
    <div style={{padding: '20px'}}>
      <Table
        dataSource={data}
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
        title={() =>
          <div>
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
          </div>}
        footer={() => <div>Page and Pagesize selection field will be coming</div>}
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
