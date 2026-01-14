import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Avatar, Spin, message, Rate } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const { Title, Paragraph, Text } = Typography;

const TestimonialsPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            try {
                const res = await api.get('/testimonials/public');
                setTestimonials(res.data);
            } catch (error) {
                console.error('Failed to fetch testimonials', error);
                message.error(t('testimonials.error_load'));
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    const currentLang = i18n.language as 'zh' | 'en' | 'mn';

    return (
        <div className="responsive-padding" style={{ padding: '60px 0', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <Title level={1}>{t('nav.testimonials')}</Title>
                <div style={{ width: 60, height: 4, background: '#4f46e5', margin: '24px auto', borderRadius: 2 }}></div>
                <Paragraph style={{ fontSize: 18, color: '#64748b' }}>
                    {t('testimonials.subtitle')}
                </Paragraph>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>
            ) : (
                <Row gutter={[32, 32]}>
                    {testimonials.map((item: any) => (
                        <Col xs={24} md={12} key={item.id}>
                            <Card
                                className="hover-lift"
                                style={{ borderRadius: 16, border: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ flex: 1 }}>
                                    <Paragraph style={{ fontSize: 16, lineHeight: '1.8', fontStyle: 'italic', color: '#475569' }}>
                                        "{item[`content_${currentLang}`] || item.content_zh}"
                                    </Paragraph>
                                </div>
                                <Card.Meta
                                    avatar={<Avatar src={item.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.id}`} size={48} />}
                                    title={<span style={{ fontWeight: 600 }}>{item[`student_name_${currentLang}`] || item.student_name}</span>}
                                    description={<span style={{ color: '#4f46e5', fontWeight: 500 }}>{item[`course_name_${currentLang}`] || item.course_name}</span>}
                                    style={{ marginTop: 24 }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {!loading && testimonials.length === 0 && (
                <div style={{ textAlign: 'center', padding: 80, color: '#999' }}>{t('common.loading')}</div>
            )}
        </div>
    );
};

export default TestimonialsPage;
