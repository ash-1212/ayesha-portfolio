export type Cat = 'fullstack' | 'backend' | 'ai' | 'frontend';
export interface Project { slug: string; title: string; desc: string; tags: string[]; cat: Cat; repo: string; live?: string; img?: string }

const gh = (r: string) => `https://github.com/ash-1212/${r}`;
/** img → put each repo's demo.webp in /public/projects/<slug>.webp. If missing, a designed placeholder shows. */
export const PROJECTS: Project[] = [
  { slug: 'taskflow', title: 'TaskFlow', cat: 'fullstack', repo: gh('CodeAlpha_ProjectManagementTool'), img: '/projects/taskflow.webp',
    desc: 'MERN project manager with a drag-and-drop Kanban board, task assignment, comments and real-time updates via Socket.io.', tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'] },
  { slug: 'shopnow', title: 'ShopNow', cat: 'fullstack', repo: gh('CodeAlpha_EcommerceStore'), img: '/projects/shopnow.webp',
    desc: 'E-commerce app with product browsing, cart, JWT auth and order placement that updates stock.', tags: ['React', 'Express', 'MongoDB', 'JWT'] },
  { slug: 'socialapp', title: 'SocialApp', cat: 'fullstack', repo: gh('CodeAlpha_SocialMediaPlatform'), img: '/projects/socialapp.webp',
    desc: 'Social platform with JWT auth, image posts, likes, comments, follows and user search.', tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript'] },
  { slug: 'object-detection', title: 'AI Object Detection & Tracking', cat: 'ai', repo: gh('object-detection'), img: '/projects/object-detection.webp',
    desc: 'Real-time detection and tracking with YOLOv8, ByteTrack and OpenCV, with live FPS and per-class stats in Streamlit.', tags: ['Python', 'YOLOv8', 'OpenCV', 'Streamlit'] },
  { slug: 'hoku-health', title: 'Hoku Health Care API', cat: 'backend', repo: gh('hoku-health-backend'),
    desc: 'Backend for a home healthcare platform: role-based auth for patients, doctors and admins, appointments, reminders and reviews.', tags: ['Node.js', 'Express', 'MongoDB', 'JWT'] },
  { slug: 'portfolio-dark', title: 'Responsive Portfolio', cat: 'frontend', repo: gh('responsive-portfolio-dark-mode'), live: 'https://bespoke-narwhal-5f8f6a.netlify.app/',
    desc: 'Mobile-first portfolio with a dark/light theme toggle, filterable projects and animated skill bars.', tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
  { slug: 'gcare', title: 'G Care Healthcare API', cat: 'backend', repo: gh('gcare-backend'),
    desc: 'Backend modules for a healthcare website: branches, booking requests, FAQs, testimonials, contact messages and newsletter, with rate limiting.', tags: ['FastAPI', 'SQLAlchemy', 'PostgreSQL'] },
  { slug: 'vegan-fresh', title: 'Vegan Fresh API', cat: 'backend', repo: gh('vegan-fresh-backend'),
    desc: 'MERN backend for an organic vegetable store: auth, products, cart, orders, Stripe payments, admin dashboard and blog.', tags: ['Node.js', 'Express', 'MongoDB', 'Stripe'] },
  { slug: 'translation-tool', title: 'AI Language Translation Tool', cat: 'ai', repo: gh('translation-tool'), img: '/projects/translation-tool.webp',
    desc: 'Translates text between 100+ languages with auto-detect and plays the result back as audio. Built with Python and Streamlit.', tags: ['Python', 'Streamlit', 'deep-translator', 'gTTS'] },
  { slug: 'ocr-detection', title: 'OCR & Object Detection', cat: 'ai', repo: gh('ocr-object-detection'), img: '/projects/ocr-detection.webp',
    desc: 'Two OpenCV vision pipelines: Tesseract OCR with image pre-processing, and object detection using a pre-trained MobileNet-SSD model.', tags: ['Python', 'OpenCV', 'Tesseract', 'MobileNet-SSD'] },
  { slug: 'iris-knn', title: 'Iris KNN Classifier', cat: 'ai', repo: gh('iris-knn-classifier'), img: '/projects/iris-knn.webp',
    desc: 'K-Nearest Neighbors pipeline on the Iris dataset with scikit-learn: scaling, stratified split, confusion matrix, F1 score and an elbow curve to choose K.', tags: ['Python', 'scikit-learn', 'KNN'] },
  { slug: 'job-role', title: 'Job Role Recommender', cat: 'ai', repo: gh('job-role-recommender'), img: '/projects/job-role.webp',
    desc: 'Content-based recommender that matches your skills to 20 job roles using TF-IDF and cosine similarity, with match scores and skills left to learn.', tags: ['Python', 'TF-IDF', 'Cosine Similarity'] },
];
