import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/Home/HomePage';
import AboutPage from './pages/About/AboutPage';
import CourseListPage from './pages/Courses/CourseListPage';
import CourseDetailPage from './pages/Courses/CourseDetailPage';
import TeachersPage from './pages/Teachers/TeachersPage';
import TestimonialsPage from './pages/Testimonials/TestimonialsPage';
import ContactPage from './pages/Contact/ContactPage';
import './i18n/config';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4f46e5',
                    borderRadius: 12,
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                },
                components: {
                    Button: {
                        controlHeightLG: 48,
                        fontWeight: 600,
                    },
                    Card: {
                        boxShadowTertiary: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    }
                }
            }}
        >
            <Router>
                <Routes>
                    <Route element={<SiteLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="courses" element={<CourseListPage />} />
                        <Route path="courses/:id" element={<CourseDetailPage />} />
                        <Route path="teachers" element={<TeachersPage />} />
                        <Route path="testimonials" element={<TestimonialsPage />} />
                        <Route path="contact" element={<ContactPage />} />
                    </Route>
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Router>
        </ConfigProvider>
    );
}

export default App;
