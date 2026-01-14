import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Row, Col, Button, Spin, message, Divider, Tag, List, Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { ArrowLeftOutlined, ClockCircleOutlined, TeamOutlined, GlobalOutlined } from '@ant-design/icons';
import api from '../../services/api';

const { Title, Paragraph, Text } = Typography;

const CourseDetailPage: React.FC = () => {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                // 后端需要提供单个课程的公开详情接口，如果还没实现，可能需要补一个
                // 暂时假设有 /api/v1/courses/{id}/public
                const res = await api.get(`/courses/public/${id}`);
                setCourse(res.data);
            } catch (error) {
                console.error('Failed to fetch course', error);
                message.error('加载课程详情失败');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: 100 }}><Spin tip={t('common.loading')} size="large" /></div>;
    if (!course) return <div style={{ textAlign: 'center', padding: 100 }}>{t('courses.not_found')}</div>;
    const currentLang = i18n.language;

    return (
        <div className="responsive-padding" style={{ padding: '40px 0', maxWidth: 1200, margin: '0 auto' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: 24 }}>
                {t('courses.back_to_list')}
            </Button>
            <Card className="hover-lift" style={{ borderRadius: 16, border: 'none', boxShadow: 'var(--shadow-md)' }}>
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={10}>
                        <img src={course.cover_image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop'} alt={course[`title_${currentLang}`] || course.title_zh} style={{ width: '100%', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }} />
                    </Col>
                    <Col xs={24} md={14}>
                        <Space direction="vertical" size={24} style={{ width: '100%' }}>
                            <div>
                                <Title level={2}>{course[`title_${currentLang}`] || course.title_zh}</Title>
                                <div style={{ color: '#4f46e5', fontSize: 18, fontWeight: 'bold' }}>{course[`duration_${currentLang}`] || course.duration}</div>
                            </div>
                            <List
                                itemLayout="horizontal"
                                dataSource={[
                                    { icon: <ClockCircleOutlined style={{ color: '#4f46e5', fontSize: 20 }} />, title: t('courses.duration'), description: course[`duration_${currentLang}`] || course.duration || t('common.loading') },
                                    { icon: <TeamOutlined style={{ color: '#4f46e5', fontSize: 20 }} />, title: t('courses.target'), description: course[`target_audience_${currentLang}`] || course.target_audience || t('common.loading') },
                                    { icon: <GlobalOutlined style={{ color: '#4f46e5', fontSize: 20 }} />, title: t('courses.format'), description: course[`format_${currentLang}`] || course.format || t('common.loading') },
                                ]}
                                renderItem={(item: any) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={item.icon}
                                            title={<Text strong>{item.title}</Text>}
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                            <Button type="primary" block size="large" style={{ height: 50 }}>
                                {t('courses.order_now')}
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            <Divider style={{ margin: '48px 0' }} />

            <div style={{ background: '#fff', padding: '24px', borderRadius: 16, border: '1px solid #f1f5f9', marginTop: 48 }}>
                <Title level={3} style={{ marginBottom: 24 }}>{t('courses.plan')}</Title>
                <div
                    style={{ fontSize: 16, lineHeight: '2', color: '#334155' }}
                    dangerouslySetInnerHTML={{ __html: course[`description_${currentLang}`] || course.description_zh }}
                />

                {course.learning_goals && (
                    <>
                        <Divider style={{ margin: '40px 0' }} />
                        <Title level={3} style={{ marginBottom: 24 }}>{t('courses.goals')}</Title>
                        <Paragraph style={{ fontSize: 16, color: '#334155', lineHeight: '1.8' }}>
                            {course[`learning_goals_${currentLang}`] || course.learning_goals}
                        </Paragraph>
                    </>
                )}

                <Divider style={{ margin: '40px 0' }} />
                <Title level={3} style={{ marginBottom: 32 }}>{t('common.enroll_process')}</Title>
                <Row gutter={[24, 24]}>
                    {[
                        { step: '01', key: 'step_01' },
                        { step: '02', key: 'step_02' },
                        { step: '03', key: 'step_03' },
                        { step: '04', key: 'step_04' }
                    ].map((item, i) => (
                        <Col xs={24} sm={12} lg={6} key={i}>
                            <div style={{ display: 'flex', gap: 16, background: '#f8fafc', padding: '24px', borderRadius: 16, height: '100%' }}>
                                <div style={{ fontSize: 32, fontWeight: 'bold', color: 'rgba(79, 70, 229, 0.15)', lineHeight: 1 }}>{item.step}</div>
                                <div>
                                    <div style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 16 }}>{t(`courses.${item.key}_title`)}</div>
                                    <div style={{ fontSize: 14, color: '#64748b', lineHeight: '1.6' }}>{t(`courses.${item.key}_desc`)}</div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default CourseDetailPage;
