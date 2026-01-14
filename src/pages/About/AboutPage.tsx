import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Spin, message, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [tenantInfo, setTenantInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);
            try {
                const res = await api.get('/tenant/info');
                setTenantInfo(res.data);
            } catch (error) {
                console.error('Failed to fetch about info', error);
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    const settings = tenantInfo?.settings || {};
    const about = settings.about_section || {};
    const currentLang = i18n.language as 'zh' | 'en' | 'mn';

    return (
        <div style={{ padding: '60px 0' }}>
            <div className="responsive-padding" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <Row gutter={[32, 48]} align="middle">
                    <Col xs={24} md={12}>
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <Title level={1}>{t('nav.about')}</Title>
                            <div style={{ width: 80, height: 4, background: '#4f46e5', margin: '24px auto', borderRadius: 2 }}></div>
                            <Paragraph style={{ fontSize: 18, color: '#64748b' }}>
                                {t('about.subtitle')}
                            </Paragraph>
                        </div>
                        <Paragraph style={{ fontSize: 18, lineHeight: '1.8', color: '#444' }}>
                            {about[`content_${currentLang}`] || about.content_zh || (currentLang === 'en' ? 'Our institution is dedicated to providing high-quality international education services and professional Chinese training to connect you with the world.' : '我们的机构致力于提供高质量的国际教育服务，专业的汉语培训，助您连接世界。')}
                        </Paragraph>
                        <Divider />
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Title level={4} style={{ color: '#4f46e5', margin: 0 }}>{t('about.founded')}</Title>
                                <Paragraph>2010</Paragraph>
                            </Col>
                            <Col span={12}>
                                <Title level={4} style={{ color: '#4f46e5', margin: 0 }}>{t('about.students')}</Title>
                                <Paragraph>10,000 +</Paragraph>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} md={12}>
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                            alt="About Us"
                            style={{ width: '100%', borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        />
                    </Col>
                </Row>
            </div>

            <div className="responsive-padding" style={{ background: '#f8fafc', padding: '100px 0', marginTop: 80 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <Title level={2}>{t('about.vision')}</Title>
                        <div style={{ width: 60, height: 4, background: '#4f46e5', margin: '24px auto', borderRadius: 2 }}></div>
                        <Paragraph style={{ fontSize: 18, maxWidth: 800, margin: '0 auto', color: '#64748b' }}>
                            {t('about.vision_text')}
                        </Paragraph>
                    </div>
                    <Row gutter={[24, 24]}>
                        {[
                            { title_zh: '卓越教学', title_en: 'Excellent Teaching', title_mn: 'Шилдэг сургалт', desc_zh: '坚持高标准教师选拔，确保每一堂课的高质量输出。', icon: '🌟' },
                            { title_zh: '以人为本', title_en: 'Student Centric', title_mn: 'Оюутан төвтэй', desc_zh: '根据学员背景定制个性化路径，重视学习体验。', icon: '❤️' },
                            { title_zh: '卓越技术', title_en: 'Tech Driven', title_mn: 'Технологийн дэвшил', desc_zh: '利用 AI 与云技术，打破地域限制，让学习随时随地。', icon: '🚀' }
                        ].map((item, idx) => (
                            <Col xs={24} md={8} key={idx}>
                                <Card bordered={false} style={{ background: '#fff', borderRadius: 20, textAlign: 'center', height: '100%' }} className="hover-lift">
                                    <div style={{ fontSize: 40, marginBottom: 20 }}>{item.icon}</div>
                                    <Title level={4}>{item[`title_${currentLang}`] || item.title_zh}</Title>
                                    <Paragraph type="secondary" style={{ fontSize: 14 }}>
                                        {currentLang === 'en' ? 'Commitment to the highest standards of education and student success.' :
                                            currentLang === 'mn' ? 'Өндөр стандарт.' : item.desc_zh}
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
