import React, { useEffect, useState } from 'react';
import {
    Table, Layout, Spin, Alert, Typography, Button, Modal, Form, Input, message, Space, Popconfirm
} from 'antd';
import { getTasks, createTask, deleteTask, executeTask, findTasksByName } from './api';
import { Task } from './types';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { useForm } = Form;
const { Search } = Input;

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [hoveredDeleteId, setHoveredDeleteId] = useState<string | null>(null); // State for hover effect
    const [form] = useForm();

    const fetchTasks = async (query: string = '') => {
        try {
            setLoading(true);
            const response = query ? await findTasksByName(query) : await getTasks();
            setTasks(response.data);
            setError(null);
        } catch (err) {
            if ((err as any).response?.status === 404) {
                setTasks([]);
                setError(null);
            } else {
                setError('Failed to fetch tasks. Make sure the backend is running.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreate = async (values: Omit<Task, 'id' | 'taskExecutions'>) => {
        setConfirmLoading(true);
        try {
            await createTask(values);
            message.success('Task created successfully!');
            setIsModalVisible(false);
            fetchTasks();
            form.resetFields();
        } catch (err) {
            message.error('Failed to create task.');
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id);
            message.success('Task deleted successfully!');
            fetchTasks();
        } catch (err) {
            message.error('Failed to delete task.');
        }
    };

    const handleExecute = async (id: string) => {
        try {
            const response = await executeTask(id);
            Modal.info({
                title: 'Task Execution Output',
                content: <pre style={{ maxHeight: '400px', overflowY: 'auto' }}>{response.data}</pre>,
                width: '600px'
            });
            fetchTasks();
        } catch (err) {
            message.error('Failed to execute task.');
        }
    };
    
    const onSearch = (value: string) => {
        fetchTasks(value);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Owner', dataIndex: 'owner', key: 'owner' },
        { title: 'Command', dataIndex: 'command', key: 'command' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Task) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleExecute(record.id)}>Run</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            onMouseEnter={() => setHoveredDeleteId(record.id)}
                            onMouseLeave={() => setHoveredDeleteId(null)}
                            style={{
                                backgroundColor: hoveredDeleteId === record.id ? '#ff4d4f' : undefined,
                                color: hoveredDeleteId === record.id ? 'white' : undefined,
                            }}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Header style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
                <Title level={2} style={{ color: 'white', margin: 0 }}>Kaiburr Task Manager</Title>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Search
                        placeholder="Search tasks by name..."
                        onSearch={onSearch}
                        style={{ width: 250 }}
                        allowClear
                    />
                    <Button type="primary" onClick={() => setIsModalVisible(true)}>Create Task</Button>
                </div>
            </Header>
            <Content style={{ padding: '24px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#fff', padding: 24, borderRadius: 8 }}>
                    {loading ? <div style={{textAlign: 'center', padding: '50px'}}><Spin size="large" /></div> : error ? <Alert message="Error" description={error} type="error" showIcon /> :
                        <Table dataSource={tasks} columns={columns} rowKey="id" />
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Kaiburr Full-Stack Assessment ©2025 Created by Saran Shabu
            </Footer>
            <Modal
                title="Create a New Task"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                confirmLoading={confirmLoading}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate} name="create_task_form">
                    <Form.Item name="name" label="Task Name" rules={[{ required: true, message: 'Please input the task name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="owner" label="Owner" rules={[{ required: true, message: 'Please input the owner!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="command" label="Command" rules={[{ required: true, message: 'Please input the command!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default App;