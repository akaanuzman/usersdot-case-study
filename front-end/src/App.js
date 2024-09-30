import React, { useState, useEffect, useCallback } from 'react';
import { Table, Empty, message, Spin } from 'antd';
import UserModel from './models/user.model';
import TableFooter from './components/footer/TableFooter';
import TableHeader from './components/header/TableHeader';
import TableActions from './components/actions/TableActions';
import UserRoleTag from './components/tag/UserRoleTag';
import UserModal from './components/modal/UserModal';
import DeleteUserModal from './components/modal/DeleteUserModal';
import ErrorResult from './components/error/ErrorResult';

const App = () => {
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * @description - Fetches users from the API. 
   * @returns {Promise<void>}
   */
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3001/users?page=${currentPage}&pageSize=${pageSize}&search=${searchTerm}`);
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
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
      setError(error);
    }
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = async (value) => {
    setLoading(true);
    setSearchTerm(value);
    setCurrentPage(1);
    await fetchUsers();
    setLoading(false);
  };

  const openModal = (userId = null) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedUserId(null);
  };

  /**
   * @description - Handles the submission of the user modal.
   * @param {Object} values - The user data to save. 
   */
  const handleModalSubmit = async (values) => {
    try {
      // If there is a selected user id, update the user, otherwise save a new user.
      const url = selectedUserId ? `http://localhost:3001/users/update` : 'http://localhost:3001/users/save';
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUserId ? { ...values, id: selectedUserId } : values),
      });
      message.success('User saved successfully!');
      await fetchUsers();
      setIsModalVisible(false);
      setSelectedUserId(null);
    } catch (error) {
      message.error('Failed to save user');
      console.error("Save error:", error);
      setError(error);
    }
  };

  /**
   * @description - Handles the change of the table page.
   * @param {Object} pagination - The new pagination object. 
   */
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  /**
   * @description - Handles the change of the page size.
   * @param {number} value - The new page size. 
   */
  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalVisible(true);
  };

  /**
   * @description - Handles the deletion of a user.
   * @returns {Promise<void>}
   */
  const handleDeleteConfirm = async () => {
    try {
      await fetch(`http://localhost:3001/users/${selectedUserId}`, {
        method: 'DELETE',
      });
      message.success('User deleted successfully');
      setIsDeleteModalVisible(false);
      setSelectedUserId(null);
      await fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
      console.error("Delete error:", error);
      setError(error);
    }
  };

  /**
   * @description - Handles the cancellation of the user deletion modal.
   */
  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedUserId(null);
  };

    // If there is an error, display the error message.
  if (error) return <ErrorResult error={error} />

  return (
    <div style={{ padding: '20px' }}>
      <Spin tip="Loading users' data...." size='large' spinning={loading}>
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
      </Spin>
    </div>
  );

};

export default App;