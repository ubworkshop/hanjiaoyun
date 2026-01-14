import { useParams, useLocation } from 'react-router-dom';

/**
 * 获取当前 URL 中的租户 Slug
 * 路径模式: /t/:slug/...
 */
export const useTenantSlug = () => {
    const { slug } = useParams<{ slug: string }>();

    // 如果 useParams 没拿到（比如在根路径），尝试从 window.location 解析
    if (slug) return slug;

    const pathParts = window.location.pathname.split('/');
    if (pathParts[1] === 't' && pathParts[2]) {
        return pathParts[2];
    }

    return null;
};
