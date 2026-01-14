import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    zh: {
        translation: {
            "nav": {
                "home": "首页",
                "about": "关于我们",
                "courses": "课程介绍",
                "teachers": "师资团队",
                "testimonials": "学员成果",
                "contact": "联系我们"
            },
            "hero": {
                "title": "开启汉语学习之旅",
                "subtitle": "专业的教学体系，让汉语学习更简单",
                "cta": "获取免费试听"
            },
            "about": {
                "subtitle": "致力于连接全球汉语学习者，提供最专业的教学与服务。",
                "founded": "成立于",
                "students": "累计学员",
                "vision": "我们的愿景",
                "vision_text": "让语言不再是障碍，让文化成为连接彼此的桥梁。"
            },
            "courses": {
                "title": "精品课程",
                "subtitle": "提供从零基础到高级进阶的全方位汉语课程，满足不同学习需求。",
                "view_details": "查看详情",
                "back_to_list": "返回列表",
                "plan": "课程方案",
                "goals": "学习目标",
                "order_now": "立即预约试听",
                "duration": "课程时长",
                "target": "适合人群",
                "format": "授课方式",
                "not_found": "未找到课程",
                "error_load": "加载课程数据失败",
                "step_01_title": "在线咨询",
                "step_01_desc": "通过官网或电话联系客服。",
                "step_02_title": "测评定级",
                "step_02_desc": "预约专业老师进行水平测评。",
                "step_03_title": "制定方案",
                "step_03_desc": "匹配最适合的课程与班型。",
                "step_04_title": "开启学习",
                "step_04_desc": "缴纳学费，正式开启汉语之旅。"
            },
            "teachers": {
                "subtitle": "由经验丰富的专业汉语教师组成的精英团队，致力于提供最优质的教学服务。",
                "error_load": "加载教师数据失败"
            },
            "testimonials": {
                "subtitle": "听听我们学员的真实声音，感受学习汉语的乐趣与成就。",
                "error_load": "加载学员评价失败"
            },
            "common": {
                "learn_more": "了解更多",
                "contact_us": "咨询我们",
                "loading": "加载中...",
                "no_data": "暂无数据",
                "why_choose_us": "为什么选择我们",
                "enroll_process": "报名流程"
            },
            "contact": {
                "title": "联系我们",
                "subtitle": "如果您有任何疑问，或者想预约免费试听课，请随时联系我们。",
                "info": "联系信息",
                "form_title": "在线留言",
                "submit": "提交留言",
                "address": "联系地址",
                "phone": "联系电话",
                "email": "电子邮箱",
                "success": "我们已收到您的消息，会尽快与您联系！",
                "label_name": "您的姓名",
                "label_phone": "联系电话",
                "label_email": "电子邮箱",
                "label_message": "咨询内容",
                "placeholder_name": "请输入姓名",
                "placeholder_phone": "请输入联系电话",
                "placeholder_email": "请输入邮箱（选填）",
                "placeholder_message": "请描述您的学习需求或疑问...",
                "instant_chat": "即时咨询",
                "messenger_chat": "Messenger 交流",
                "facebook_chat": "Facebook 主页",
                "wechat_chat": "微信咨询",
                "scan_qr": "扫码即可关注",
                "chat_desc": "蒙古国最受欢迎的沟通方式，家长首选。"
            }
        }
    },
    en: {
        translation: {
            "nav": {
                "home": "Home",
                "about": "About",
                "courses": "Courses",
                "teachers": "Teachers",
                "testimonials": "Success Stories",
                "contact": "Contact"
            },
            "hero": {
                "title": "Start Your Chinese Journey",
                "subtitle": "Professional teaching system makes learning Chinese easier",
                "cta": "Free Trial Lesson"
            },
            "about": {
                "subtitle": "Dedicated to connecting global Chinese learners, providing the most professional teaching and services.",
                "founded": "Founded",
                "years": "Years History",
                "students": "Students",
                "vision": "Our Vision",
                "vision_text": "Make language no longer a barrier, let culture become a bridge connecting each other."
            },
            "courses": {
                "title": "Featured Courses",
                "subtitle": "Offering a full range of Chinese courses from zero basic to advanced level, meeting different learning needs.",
                "view_details": "View Details",
                "back_to_list": "Back to List",
                "plan": "Curriculum",
                "goals": "Learning Goals",
                "order_now": "Book Trial Now",
                "duration": "Duration",
                "target": "Target Audience",
                "format": "Format",
                "not_found": "Course Not Found",
                "error_load": "Failed to load courses",
                "step_01_title": "Inquiry",
                "step_01_desc": "Contact us via website or phone.",
                "step_02_title": "Assessment",
                "step_02_desc": "Book a professional assessment.",
                "step_03_title": "Plan",
                "step_03_desc": "Match the best course and schedule.",
                "step_04_title": "Start",
                "step_04_desc": "Pay tuition and start journey.",
                "enroll_step": "Step"
            },
            "teachers": {
                "subtitle": "An elite team of experienced professional Chinese teachers dedicated to providing the highest quality teaching services.",
                "error_load": "Failed to load teachers"
            },
            "testimonials": {
                "subtitle": "Hear the real voices of our students and feel the fun and achievement of learning Chinese.",
                "error_load": "Failed to load testimonials"
            },
            "common": {
                "learn_more": "Learn More",
                "contact_us": "Contact Us",
                "loading": "Loading...",
                "no_data": "No Data",
                "why_choose_us": "Why Choose Us",
                "enroll_process": "Enrollment Process"
            },
            "contact": {
                "title": "Contact Us",
                "subtitle": "If you have any questions or want to book a free trial, please feel free to reach out.",
                "info": "Contact Info",
                "form_title": "Send Message",
                "submit": "Send",
                "address": "Address",
                "phone": "Phone",
                "email": "Email",
                "success": "Message received! We will contact you soon.",
                "label_name": "Your Name",
                "label_phone": "Phone Number",
                "label_email": "Email Address",
                "label_message": "Inquiry Details",
                "placeholder_name": "Enter your name",
                "placeholder_phone": "Enter phone number",
                "placeholder_email": "Enter email (optional)",
                "placeholder_message": "Describe your needs or questions...",
                "instant_chat": "Instant Inquiry",
                "messenger_chat": "Messenger",
                "facebook_chat": "Facebook",
                "wechat_chat": "WeChat",
                "scan_qr": "Scan to Follow",
                "chat_desc": "The most popular way in Mongolia, preferred by parents."
            }
        }
    },
    mn: {
        translation: {
            "nav": {
                "home": "Нүүр",
                "about": "Бидний тухай",
                "courses": "Хөтөлбөр",
                "teachers": "Багш нар",
                "testimonials": "Сэтгэгдэл",
                "contact": "Холбоо барих"
            },
            "hero": {
                "title": "Хятад хэлний аяллаа эхлүүл",
                "subtitle": "Мэргэжлийн сургалтын систем, хятад хэлийг хялбар сур",
                "cta": "Үнэгүй хичээл авах"
            },
            "about": {
                "subtitle": "Дэлхийн хятад хэл суралцагчдыг холбож, мэргэжлийн түвшний сургалт, үйлчилгээ үзүүлэхэд чиглэнэ.",
                "founded": "Байгуулагдсан",
                "years": "Жилийн түүх",
                "students": "Нийт оюутнууд",
                "vision": "Бидний алсын хараа",
                "vision_text": "Хэлний бэрхшээлийг арилгаж, соёлыг хоорондоо холбох гүүр болгоно."
            },
            "courses": {
                "title": "Шилдэг хөтөлбөрүүд",
                "subtitle": "Хятад хэлний анхнаас нь ахисан шат хүртэлх бүх төрлийн хичээлийг санал болгож байна.",
                "view_details": "Дэлгэрэнгүй",
                "back_to_list": "Жагсаалт руу буцах",
                "plan": "Курсын төлөвлөгөө",
                "goals": "Суралцах зорилго",
                "order_now": "Одоо захиалах",
                "duration": "Хичээлийн хугацаа",
                "target": "Суралцагчид",
                "format": "Хичээлийн хэлбэр",
                "not_found": "Хөтөлбөр олдсонгүй",
                "error_load": "Мэдээлэл авахад алдаа гарлаа",
                "step_01_title": "Зөвлөгөө",
                "step_02_title": "Үнэлгээ",
                "step_03_title": "Төлөвлөгөө",
                "step_04_title": "Эхлэл",
                "enroll_step": "Алхам"
            },
            "teachers": {
                "subtitle": "Хамгийн чанартай сургалтын үйлчилгээг үзүүлэхэд чиглэсэн хятад хэлний мэргэжлийн багш нарын элит баг.",
                "error_load": "Багшийн мэдээлэл авахад алдаа гарлаа"
            },
            "testimonials": {
                "subtitle": "Суралцагчдынхаа бодит дуу хоолойг сонсож, хятад хэл сурахын сонирхол, ололт амжилтыг мэдрээрэй.",
                "error_load": "Сэтгэгдэл авахад алдаа гарлаа"
            },
            "contact": {
                "title": "Холбоо барих",
                "subtitle": "Танд асуулт байгаа бол эсвэл үнэгүй туршилтын хичээл захиалахыг хүсвэл бидэнтэй холбоо бариарай.",
                "info": "Холбоо барих мэдээлэл",
                "form_title": "Зурвас илгээх",
                "submit": "Илгээх",
                "address": "Хаяг",
                "phone": "Утас",
                "email": "Э-мэйл",
                "success": "Таны зурвас хүлээн авлаа, бид тантай удахгүй холбогдох болно!",
                "label_name": "Таны нэр",
                "label_phone": "Утасны дугаар",
                "label_email": "Э-мэйл хаяг",
                "label_message": "Зөвлөгөө авах агуулга",
                "placeholder_name": "Нэрээ оруулна уу",
                "placeholder_phone": "Утасны дугаараа оруулна уу",
                "placeholder_email": "Э-мэйл хаягаа оруулна уу (заавал биш)",
                "placeholder_message": "Сурах хэрэгцээ эсвэл асуултаа тайлбарлана уу...",
                "instant_chat": "Шуурхай зөвлөгөө",
                "messenger_chat": "Messenger",
                "facebook_chat": "Facebook",
                "wechat_chat": "WeChat",
                "scan_qr": "QR код уншуулах",
                "chat_desc": "Монголын хамгийн түгээмэл харилцаа, эцэг эхчүүдийн сонголт."
            },
            "contact_form": {
                "name": "Таны нэр",
                "phone": "Утас",
                "email": "Э-мэйл",
                "message": "Агуулга",
                "submit": "Илгээх"
            },
            "common": {
                "learn_more": "Дэлгэрэнгүй",
                "contact_us": "Зөвлөгөө авах",
                "loading": "Уншиж байна...",
                "no_data": "Мэдээлэл байхгүй",
                "why_choose_us": "Яагаад бид гэж?",
                "enroll_process": "Бүртгүүлэх заавар"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "zh",
        fallbackLng: "zh",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
