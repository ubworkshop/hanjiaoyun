import React from 'react';
import { Typography, Row, Col, Card, Form, Input, Button, message, Space, Tag, Badge } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SendOutlined, MessageOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const { Title, Paragraph, Text } = Typography;

const ContactPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const [tenantInfo, setTenantInfo] = React.useState<any>(null);
    const [submitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get('/tenant/info');
                setTenantInfo(res.data);
            } catch (error) {
                console.error('Failed to fetch contact info');
            }
        };
        fetchInfo();
    }, []);

    const onFinish = async (values: any) => {
        // 兼容不同的嵌套层级 锋
        const accessKey = tenantInfo?.settings?.social_platforms?.web3forms_key || tenantInfo?.social_platforms?.web3forms_key;
        console.log('Sending message via Web3Forms with Key:', accessKey);

        if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
            console.warn('Web3Forms Access Key is missing or default.');
            message.warning({
                content: '检测到配置尚未生效：请按 Cmd+Shift+R (Mac) 或 Ctrl+F5 (Win) 强力刷新网页后再试。锋',
                duration: 10,
                style: { marginTop: '20vh' }
            });
            console.log('Current Tenant Info in State:', tenantInfo);
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    ...values,
                    from_name: "Hanjiao Cloud Platform",
                    subject: `New Inquiry from ${values.name}`,
                }),
            });

            const result = await response.json();
            if (result.success) {
                message.success('发送成功！请检查邮箱（含垃圾箱）。锋', 5);
                form.resetFields();
            } else {
                console.error('Web3Forms API Error:', result);
                message.error(`提交失败: ${result.message || '未知错误'}。请检查 Key 是否正确。锋`);
            }
        } catch (error) {
            console.error('Web3Forms Connection Error:', error);
            message.error('Network error. Please ensure you are online.');
        } finally {
            setSubmitting(false);
        }
    };

    const currentLang = i18n.language as 'zh' | 'en' | 'mn';
    const contact = tenantInfo || {};

    return (
        <div style={{ padding: '60px 0' }}>
            <div className="responsive-padding" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <Title level={1}>{t('nav.contact')}</Title>
                    <div style={{ width: 80, height: 4, background: '#4f46e5', margin: '24px auto', borderRadius: 2 }}></div>
                    <Paragraph style={{ fontSize: 18, color: '#64748b' }}>
                        {t('contact.subtitle')}
                    </Paragraph>
                </div>

                <Row gutter={[32, 48]}>
                    <Col xs={24} lg={10}>
                        <Space direction="vertical" size={48} style={{ width: '100%' }}>
                            <Card bordered={false} bodyStyle={{ padding: 0 }} style={{ background: 'transparent' }}>
                                <Space align="start" size={24}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(79,70,229,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <PhoneOutlined style={{ fontSize: 24, color: '#4f46e5' }} />
                                    </div>
                                    <div>
                                        <Title level={4} style={{ margin: 0 }}>{t('contact.phone')}</Title>
                                        <Paragraph style={{ fontSize: 16, marginTop: 8 }}>{contact.phone || '+86 123 4567 8901'}</Paragraph>
                                    </div>
                                </Space>
                            </Card>

                            <Card bordered={false} bodyStyle={{ padding: 0 }} style={{ background: 'transparent' }}>
                                <Space align="start" size={24}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(79,70,229,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <MailOutlined style={{ fontSize: 24, color: '#4f46e5' }} />
                                    </div>
                                    <div>
                                        <Title level={4} style={{ margin: 0 }}>{t('contact.email')}</Title>
                                        <Paragraph style={{ fontSize: 16, marginTop: 8 }}>{contact.email || 'contact@hanjiaoyun.com'}</Paragraph>
                                    </div>
                                </Space>
                            </Card>

                            <Card bordered={false} bodyStyle={{ padding: 0 }} style={{ background: 'transparent' }}>
                                <Space align="start" size={24}>
                                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(79,70,229,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <EnvironmentOutlined style={{ fontSize: 24, color: '#4f46e5' }} />
                                    </div>
                                    <div>
                                        <Title level={4} style={{ margin: 0 }}>{t('contact.address')}</Title>
                                        <Paragraph style={{ fontSize: 16, marginTop: 8 }}>{contact[`address_${currentLang}`] || contact.address_zh || '北京市朝阳区某某大厦 808 室'}</Paragraph>
                                    </div>
                                </Space>
                            </Card>

                            <div style={{ marginTop: 20, paddingTop: 40, borderTop: '1px solid #f1f5f9' }}>
                                <Title level={4} style={{ marginBottom: 24 }}>{t('contact.instant_chat')}</Title>
                                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                    {/* Messenger Button */}
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<MessageOutlined />}
                                        href={tenantInfo?.settings?.social_platforms?.messenger_link}
                                        target="_blank"
                                        style={{
                                            width: '100%',
                                            height: 56,
                                            borderRadius: 12,
                                            background: 'linear-gradient(135deg, #0695FF 0%, #A334FA 100%)',
                                            border: 'none',
                                            fontSize: 16,
                                            fontWeight: 600,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {t('contact.messenger_chat')}
                                    </Button>

                                    {/* WeChat Card */}
                                    <Card
                                        style={{
                                            borderRadius: 16,
                                            background: '#f8fafc',
                                            border: '1px solid #e2e8f0',
                                            overflow: 'hidden'
                                        }}
                                        bodyStyle={{ padding: '20px' }}
                                    >
                                        <Row align="middle" gutter={20}>
                                            <Col span={8}>
                                                <img
                                                    src={tenantInfo?.settings?.social_platforms?.wechat_qr_url || '/images/wechat_qr.png'}
                                                    alt="WeChat QR"
                                                    style={{ width: '100%', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                                                />
                                            </Col>
                                            <Col span={16}>
                                                <Title level={5} style={{ margin: '0 0 4px 0' }}>{t('contact.wechat_chat')}</Title>
                                                <Paragraph type="secondary" style={{ fontSize: 13, margin: 0 }}>
                                                    {t('contact.chat_desc')}
                                                </Paragraph>
                                                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <Tag color="green" style={{ margin: 0, borderRadius: 4 }}>ID: {tenantInfo?.settings?.social_platforms?.wechat_id || 'hanjiaoyun'}</Tag>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Space>
                            </div>
                        </Space>
                    </Col>

                    <Col xs={24} lg={14}>
                        <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-lg)', padding: 24, border: 'none' }}>
                            <Title level={3} style={{ marginBottom: 32 }}>{t('contact.form_title')}</Title>
                            <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                                <Row gutter={16}>
                                    <Col xs={24} sm={12}>
                                        <Form.Item label={t('contact.label_name')} name="name" rules={[{ required: true }]}>
                                            <Input placeholder={t('contact.placeholder_name')} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <Form.Item label={t('contact.label_phone')} name="phone" rules={[{ required: true }]}>
                                            <Input placeholder={t('contact.placeholder_phone')} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item label={t('contact.label_email')} name="email">
                                    <Input placeholder={t('contact.placeholder_email')} />
                                </Form.Item>
                                <Form.Item label={t('contact.label_message')} name="message" rules={[{ required: true }]}>
                                    <Input.TextArea rows={4} placeholder={t('contact.placeholder_message')} />
                                </Form.Item>
                                <Form.Item style={{ marginBottom: 0 }}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        icon={<SendOutlined />}
                                        block
                                        loading={submitting}
                                        style={{ height: 50, fontSize: 16 }}
                                    >
                                        {t('contact.submit')}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ContactPage;
