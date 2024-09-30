import React, { useState, useEffect, useCallback } from 'react';
import { Table, Empty, message } from 'antd';
import UserModel from './models/user.model';
import TableFooter from './components/footer/TableFooter';
import TableHeader from './components/header/TableHeader';
import TableActions from './components/actions/TableActions';
import UserRoleTag from './components/tag/UserRoleTag';
import UserModal from './components/modal/UserModal';
import DeleteUserModal from './components/modal/DeleteUserModal';

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  const openModal = (userId = null) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };


  const handleModalSubmit = async (values) => {
    try {
      const url = selectedUserId ? `http://localhost:3001/users/update` : 'http://localhost:3001/users/save';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUserId ? { ...values, id: selectedUserId } : values),
      });

      if (!response.ok) {
        throw new Error(`Error saving user: ${response.statusText}`);
      }

      message.success('User saved successfully!');
      await fetchUsers(); // Tabloyu güncellemek için kullanıcıları yeniden fetch et
      setIsModalVisible(false);
      setSelectedUserId(null);
    } catch (error) {
      message.error('Failed to save user');
      console.error("Save error:", error);
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${selectedUserId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`status: ${response.status}`);
      }
      message.success('User deleted successfully');
      setIsDeleteModalVisible(false);
      setSelectedUserId(null);
      await fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
      console.error("Delete error:", error);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedUserId(null);
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
            render: (id) => (
              <TableActions
                onEdit={() => openModal(id)}
                onDelete={() => openDeleteModal(id)}
              />
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
        title={() => (
          <TableHeader
            handleSearch={handleSearch}
            openModal={() => openModal()}
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
      <UserModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        userId={selectedUserId}
      />
      <DeleteUserModal
        visible={isDeleteModalVisible}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default App;