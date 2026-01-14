import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Spin, message, Button, Tag, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const { Title, Paragraph } = Typography;

const CourseListPage: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const res = await api.get('/courses/public');
                setCourses(res.data);
            } catch (error) {
                console.error('Failed to fetch courses', error);
                message.error(t('courses.error_load'));
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const currentLang = i18n.language as 'zh' | 'en' | 'mn';

    return (
        <div className="responsive-padding" style={{ padding: '60px 0', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <Title level={1}>{t('courses.title')}</Title>
                <Paragraph style={{ fontSize: 18, color: '#64748b' }}>
                    {t('courses.subtitle')}
                </Paragraph>
                <div style={{ width: 60, height: 4, background: '#4f46e5', margin: '24px auto', borderRadius: 2 }}></div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>
            ) : (
                <Row gutter={[32, 32]}>
                    {courses.map((course: any) => (
                        <Col xs={24} sm={12} lg={8} key={course.id}>
                            <Card
                                hoverable
                                cover={<img alt={course.title_zh} src={course.cover_image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop'} style={{ height: 240, objectFit: 'cover' }} />}
                                style={{ borderRadius: 12, overflow: 'hidden' }}
                            >
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Tag color="#4f46e5">{course[`format_${currentLang}`] || course.format || 'Standard'}</Tag>
                                    <Title level={4} style={{ margin: '8px 0' }}>
                                        {course[`title_${currentLang}`] || course.title_zh}
                                    </Title>
                                    <div
                                        style={{ color: '#666', height: '4.5em', overflow: 'hidden' }}
                                        dangerouslySetInnerHTML={{ __html: course[`description_${currentLang}`] || course.description_zh }}
                                    />
                                    <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: '#4f46e5', fontWeight: 'bold' }}>{course[`duration_${currentLang}`] || course.duration}</span>
                                        <Link to={`/courses/${course.id}`}>
                                            <Button type="primary">{t('courses.view_details')}</Button>
                                        </Link>
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {!loading && courses.length === 0 && (
                <div style={{ textAlign: 'center', padding: 80, color: '#999' }}>{t('common.no_data')}</div>
            )}
        </div>
    );
};

export default CourseListPage;
