import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Select, Drawer, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import api from '../../services/api';
import SEO from '../common/SEO';

const { Header, Content, Footer } = Layout;
const { Paragraph } = Typography;

const SiteLayout: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [tenantInfo, setTenantInfo] = React.useState<any>(null);
    const [drawerVisible, setDrawerVisible] = useState(false);

    React.useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get('/tenant/info');
                setTenantInfo(res.data);
            } catch (error) {
                console.error('Failed to fetch tenant info', error);
            }
        };
        fetchInfo();
    }, []);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const menuItems = [
        { key: '/', label: t('nav.home') },
        { key: '/about', label: t('nav.about') },
        { key: '/courses', label: t('nav.courses') },
        { key: '/teachers', label: t('nav.teachers') },
        { key: '/testimonials', label: t('nav.testimonials') },
        { key: '/contact', label: t('nav.contact') },
    ];

    const currentLang = i18n.language;

    return (
        <Layout style={{ minHeight: '100vh', background: '#fff' }}>
            <SEO tenantInfo={tenantInfo} />
            <Header style={{
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 var(--container-px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                width: '100%'
            }}>
                <div style={{ fontWeight: 'bold', fontSize: 20, color: '#4f46e5', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/')}>
                    <img src={tenantInfo?.logo_url || '/logo.png'} alt="logo" style={{ height: 28, marginRight: 8 }} />
                    <span className="site-title">{tenantInfo?.[`name_${currentLang}`] || tenantInfo?.name_zh || '汉教云'}</span>
                </div>

                {/* Desktop Menu */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }} className="desktop-only">
                    <Menu
                        mode="horizontal"
                        selectedKeys={[location.pathname]}
                        items={menuItems}
                        onClick={({ key }) => navigate(key)}
                        style={{ borderBottom: 'none', minWidth: 400, fontWeight: 500 }}
                    />
                </div>

                <Space>
                    <Select
                        defaultValue={currentLang}
                        style={{ width: 100 }}
                        size="small"
                        onChange={changeLanguage}
                        options={[
                            { value: 'zh', label: '简' },
                            { value: 'en', label: 'EN' },
                            { value: 'mn', label: 'Мон' },
                        ]}
                        className="desktop-only"
                    />
                    <Button type="primary" className="desktop-only" onClick={() => navigate('/contact')}>
                        {t('common.contact_us')}
                    </Button>
                    <Button
                        icon={<MenuOutlined />}
                        className="mobile-only"
                        onClick={() => setDrawerVisible(true)}
                        style={{ border: 'none', background: 'transparent', fontSize: 20 }}
                    />
                </Space>
            </Header>

            <Drawer
                title={tenantInfo?.[`name_${currentLang}`] || '汉教云'}
                placement="right"
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                width={250}
            >
                <div style={{ marginBottom: 24 }}>
                    <Paragraph strong>{t('common.language') || 'Language'}</Paragraph>
                    <Select
                        defaultValue={currentLang}
                        style={{ width: '100%' }}
                        onChange={(val) => {
                            changeLanguage(val);
                            setDrawerVisible(false);
                        }}
                        options={[
                            { value: 'zh', label: '简体中文' },
                            { value: 'en', label: 'English' },
                            { value: 'mn', label: 'Монгол' },
                        ]}
                    />
                </div>
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => {
                        navigate(key);
                        setDrawerVisible(false);
                    }}
                    style={{ borderRight: 'none' }}
                />
            </Drawer>

            <Content>
                <Outlet />
            </Content>

            <Footer style={{ textAlign: 'center', background: '#f8fafc', padding: '64px 20px' }}>
                <div style={{ color: '#4f46e5', fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
                    {tenantInfo?.[`name_${currentLang}`] || tenantInfo?.name_zh || '汉教云'}
                </div>
                <div style={{ color: '#64748b', fontSize: 12 }}>©2024 {tenantInfo?.[`name_${currentLang}`] || 'Hanjiao Cloud'}. All Rights Reserved.</div>
            </Footer>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-only { display: none !important; }
                    .mobile-only { display: flex !important; }
                    .site-title { font-size: 16px; }
                }
                @media (min-width: 769px) {
                    .mobile-only { display: none !important; }
                }
            `}</style>
        </Layout>
    );
};

export default SiteLayout;
