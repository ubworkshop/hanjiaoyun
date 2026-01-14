import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Avatar, Spin, message, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const { Title, Paragraph } = Typography;

const TeachersPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            try {
                const res = await api.get('/teachers/public');
                setTeachers(res.data);
            } catch (error) {
                console.error('Failed to fetch teachers', error);
                message.error(t('teachers.error_load'));
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    const currentLang = i18n.language as 'zh' | 'en' | 'mn';

    return (
        <div className="responsive-padding" style={{ padding: '60px 0', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <Title level={1}>{t('nav.teachers')}</Title>
                <Paragraph style={{ fontSize: 18, color: '#64748b' }}>
                    {t('teachers.subtitle')}
                </Paragraph>
                <div style={{ width: 60, height: 4, background: '#4f46e5', margin: '24px auto', borderRadius: 2 }}></div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>
            ) : (
                <Row gutter={[48, 48]}>
                    {teachers.map((teacher: any) => (
                        <Col xs={24} sm={12} lg={8} key={teacher.id}>
                            <Card
                                bordered={false}
                                style={{ textAlign: 'center', background: 'transparent' }}
                                bodyStyle={{ padding: '24px 0' }}
                            >
                                <Card
                                    hoverable
                                    className="hover-lift"
                                    cover={<img alt={teacher[`name_${currentLang}`]} src={teacher.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'} style={{ height: 300, objectFit: 'cover' }} />}
                                    style={{ borderRadius: 16, overflow: 'hidden', border: 'none' }}
                                >
                                    <Card.Meta
                                        title={teacher[`name_${currentLang}`] || teacher.name_zh}
                                        description={<span style={{ color: '#4f46e5', fontWeight: 500 }}>{teacher[`title_${currentLang}`] || teacher.title_zh}</span>}
                                    />
                                </Card>
                                <Paragraph type="secondary" style={{ color: '#4f46e5', fontWeight: 'bold', marginBottom: 16, marginTop: 16 }}>
                                    {teacher[`experience_${currentLang}`] || teacher.experience || 'Senior Teacher'}
                                </Paragraph>
                                <div
                                    style={{ color: '#666', textAlign: 'left', lineHeight: '1.6' }}
                                    dangerouslySetInnerHTML={{ __html: teacher[`bio_${currentLang}`] || teacher.bio_zh }}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {teachers.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                    {t('common.loading')}
                </div>
            )}
        </div>
    );
};

export default TeachersPage;
