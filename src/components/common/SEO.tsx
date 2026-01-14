import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    tenantInfo?: any;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, tenantInfo }) => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language as 'zh' | 'en' | 'mn';

    useEffect(() => {
        const seo = tenantInfo?.seo || {};
        const settings = tenantInfo?.settings || {};

        // 优先使用页面传入的标题，否则使用租户全局配置，最后使用备显
        const siteTitle = seo[`title_${currentLang}`] || seo.title_zh || tenantInfo?.name || '汉教云';
        const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;

        const siteDesc = description || seo[`description_${currentLang}`] || seo.description_zh || '专业的汉语培训平台';
        const siteKeywords = keywords || seo.keywords || '汉语学习, HSK, 汉语培训';

        document.title = pageTitle;

        // 更新 meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            (metaDesc as any).name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', siteDesc);

        // 更新 meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            (metaKeywords as any).name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', siteKeywords);
    }, [title, description, keywords, tenantInfo, currentLang]);

    return null; // 此组件仅用于副作用
};

export default SEO;
