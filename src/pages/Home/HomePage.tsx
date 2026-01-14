import React, { useEffect, useState } from 'react';
import { Typography, Button, Row, Col, Card, Space, Spin, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [tenantInfo, setTenantInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublicData = async () => {
            setLoading(true);
            try {
                // 获取租户公开信息
                const infoRes = await api.get('/tenant/info');
                setTenantInfo(infoRes.data);

                // 获取公开课程列表
                const res = await api.get('/courses/public');
                setCourses(res.data.slice(0, 3)); // 首页展示前3个
            } catch (error) {
                console.error('Failed to fetch data', error);
                message.error('加载页面数据失败');
            } finally {
                setLoading(false);
            }
        };
        fetchPublicData();
    }, []);

    const currentLang = i18n.language as 'zh' | 'en' | 'mn';
    const settings = tenantInfo?.settings || {};
    const hero = settings.hero_section || {};

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-gradient responsive-padding" style={{
                paddingTop: 120,
                paddingBottom: 120,
                textAlign: 'center',
                borderBottom: '1px solid rgba(79, 70, 229, 0.05)'
            }}>
                <Title className="hero-title" style={{ color: '#333', marginBottom: 24 }}>
                    {hero[`title_${currentLang}`] || hero.title_zh || t('hero.title')}
                </Title>
                <Paragraph style={{ fontSize: 18, color: '#666', marginBottom: 40, maxWidth: 800, margin: '0 auto 40px' }}>
                    {hero[`subtitle_${currentLang}`] || hero.subtitle_zh || t('hero.subtitle')}
                </Paragraph>
                <Space size="middle" wrap={true} style={{ justifyContent: 'center' }}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate('/contact')}
                        style={{ height: 48, padding: '0 32px' }}
                    >
                        {hero[`cta_text_${currentLang}`] || hero.cta_text_zh || t('common.contact_us')}
                    </Button>
                    <Button
                        size="large"
                        style={{ height: 48, padding: '0 32px' }}
                        onClick={() => navigate('/about')}
                    >
                        {t('common.learn_more')}
                    </Button>
                </Space>
            </div>

            {/* Features Section */}
            <div style={{ background: '#f8fafc', padding: '100px 0' }}>
                <div className="responsive-padding" style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <Title level={2}>{t('common.why_choose_us')}</Title>
                        <div style={{ width: 60, height: 4, background: '#4f46e5', margin: '0 auto', borderRadius: 2 }}></div>
                    </div>
                    <Row gutter={[32, 32]}>
                        {(settings.features_section?.items || []).map((item: any, idx: number) => (
                            <Col xs={24} md={12} lg={6} key={idx}>
                                <Card
                                    bordered={false}
                                    className="hover-lift"
                                    style={{ textAlign: 'center', height: '100%', borderRadius: 20 }}
                                >
                                    <div style={{
                                        fontSize: 32,
                                        width: 64,
                                        height: 64,
                                        background: 'rgba(79, 70, 229, 0.05)',
                                        borderRadius: 16,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 24px',
                                        color: '#4f46e5'
                                    }}>
                                        {idx === 0 ? '🎓' : idx === 1 ? '👥' : idx === 2 ? '💬' : '📅'}
                                    </div>
                                    <Title level={4}>{item[`title_${currentLang}`] || item.title_zh}</Title>
                                    <Paragraph style={{ color: '#64748b' }}>
                                        {item[`desc_${currentLang}`] || item.desc_zh}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Courses Preview */}
            {settings.show_courses !== false && (
                <div className="responsive-padding" style={{ padding: '80px 0', background: '#fff' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <Title level={2}>{t('nav.courses')}</Title>
                        <div style={{ width: 60, height: 4, background: '#4f46e5', margin: '0 auto', borderRadius: 2 }}></div>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
                    ) : (
                        <Row gutter={[24, 24]} justify="center">
                            {courses.map((course: any) => (
                                <Col xs={24} sm={12} lg={8} key={course.id}>
                                    <Card
                                        hoverable
                                        className="hover-lift"
                                        cover={<img alt="example" src={course.cover_image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop'} style={{ height: 240, objectFit: 'cover' }} />}
                                        style={{ borderRadius: 16, overflow: 'hidden', border: 'none', background: '#fff' }}
                                    >
                                        <Card.Meta
                                            title={course[`title_${currentLang}`] || course.title_zh}
                                            description={
                                                <div
                                                    style={{ color: '#666', height: '4.5em', overflow: 'hidden' }}
                                                    dangerouslySetInnerHTML={{ __html: course[`description_${currentLang}`] || course.description_zh }}
                                                />
                                            }
                                        />
                                        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: '#4f46e5', fontWeight: 'bold' }}>{course[`duration_${currentLang}`] || course.duration}</span>
                                            <Button
                                                type="link"
                                                style={{ padding: 0, fontWeight: 600 }}
                                                onClick={() => navigate(`/courses/${course.id}`)}
                                            >
                                                {t('courses.view_details')} →
                                            </Button>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
