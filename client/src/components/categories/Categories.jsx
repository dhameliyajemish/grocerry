import styles from './categories.module.css';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Categories = () => {
    const categories = [
        { display: "All Products", value: "", count: "1000+", icon: "grid_view", gradient: "linear-gradient(135deg, #00b09b, #96c93d)" },
        { display: "Beverages", value: "Beverages", count: "125", icon: "local_cafe", gradient: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)" },
        { display: "Dairy", value: "Dairy", count: "48", icon: "water_drop", gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)" },
        { display: "Grains", value: "Grains", count: "86", icon: "grass", gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
        { display: "HomeCare", value: "HomeCare", count: "54", icon: "cleaning_services", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
        { display: "Oils", value: "Oils", count: "32", icon: "oil_barrel", gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
        { display: "PersonalCare", value: "PersonalCare", count: "98", icon: "health_and_beauty", gradient: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)" },
        { display: "Pulses", value: "Pulses", count: "65", icon: "rice_bowl", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
        { display: "Snacks", value: "Snacks", count: "145", icon: "tapas", gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" },
        { display: "Spices", value: "Spices", count: "72", icon: "kitchen", gradient: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className={styles['categories']}>
            <motion.div 
                className={styles['categories-container']}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView="auto"
                    spaceBetween={20}
                    centeredSlides={false}
                    loop={false}
                    breakpoints={{
                        320: { slidesPerView: 1.2 },
                        640: { slidesPerView: 2.2 },
                        768: { slidesPerView: 3.2 },
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 }
                    }}
                >
                    {categories.map((item, i) => (
                        <SwiperSlide key={i}>
                            <motion.div variants={itemVariants}>
                                <Link to={`/products?category=${item.value}`} className={styles['category']} style={{ background: item.gradient }}>
                                    <div className={styles['icon-container']}>
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                    </div>
                                    <div className={styles['content']}>
                                        <div className={styles['title']}>{item.display}</div>
                                        <div className={styles['count']}>{item.count} Products</div>
                                    </div>
                                </Link>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </div>
    );
}

export default Categories;