// 静态化改造：使用本地数据文件替代后端 API 调用 锋
import tenantData from '../data/tenant.json';
import coursesData from '../data/courses.json';
import teachersData from '../data/teachers.json';
import testimonialsData from '../data/testimonials.json';

// 模拟 Axios 响应结构，以减少对现有页面组件的改动 锋
const mockResponse = (data: any) => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
});

const api = {
    get: async (url: string) => {
        // 延迟模拟网络耗时
        await new Promise(resolve => setTimeout(resolve, 100));

        if (url.includes('/tenant/info')) {
            return mockResponse(tenantData);
        }
        if (url.includes('/courses/public')) {
            // 处理详情请求 /courses/public/{id} 锋
            const parts = url.split('/');
            const id = parts[parts.length - 1];
            if (id !== 'public' && id !== '') {
                const course = coursesData.find(c => c.id === id);
                return mockResponse(course);
            }
            return mockResponse(coursesData);
        }
        if (url.includes('/teachers/public')) {
            return mockResponse(teachersData);
        }
        if (url.includes('/testimonials/public')) {
            return mockResponse(testimonialsData);
        }

        throw new Error(`Static mock not implemented for URL: ${url}`);
    }
};

export default api;
