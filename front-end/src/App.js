import React, { useState, useEffect, useCallback } from 'react';
import { Table, Modal, Empty } from 'antd';
import UserModel from './models/user.model';
import TableFooter from './components/footer/TableFooter';
import TableHeader from './components/header/TableHeader';
import TableActions from './components/actions/TableActions';
import UserRoleTag from './components/tag/UserRoleTag';

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  /**
   * @description Fetch users from API
   * @returns {Promise<void>}
   * @throws {Error}
   */
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/users?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`status: ${response.status}`);
      }
      const result = await response.json();
      const users = result.users.map((user) => new UserModel(
        user.id,
        user.name,
        user.surname,
        user.email,
        user.password,
        user.phone,
        user.age,
        user.country,
        user.district,
        user.role,
        user.createdAt,
        user.updatedAt
      ));
      setUsers(users);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = async (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    await fetchUsers();
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
        locale={{
          emptyText: (
            <Empty description="No users found" />
          ),
        }}
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
            render: (role) => (<UserRoleTag role={role} />),
          },
          {
            title: 'Actions',
            dataIndex: 'id',
            key: 'id',
            render: (_) => (<TableActions />),
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
        title={() => (
          <TableHeader
            handleSearch={handleSearch}
            openModal={openModal}
          />
        )}
        footer={() => (
          <TableFooter
            usersLength={users.length}
            totalCount={totalCount}
            handlePageSizeChange={handlePageSizeChange}
          />
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