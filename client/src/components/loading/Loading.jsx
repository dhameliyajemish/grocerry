import styles from './loading.module.css';

const Loading = ({ type = 'default', overlay = false, count = 8 }) => {
    
    if (type === 'products') {
        return (
            <div className={styles['products-grid']}>
                {[...Array(count)].map((_, i) => (
                    <div key={i} className={`${styles['skeleton-card']} glass-panel`}>
                        <div className={`${styles['skeleton-img']} shimmer`} />
                        <div className={styles['skeleton-content']}>
                            <div className={`${styles['skeleton-text']} shimmer`} style={{ width: '80%' }} />
                            <div className={`${styles['skeleton-text']} shimmer`} style={{ width: '60%' }} />
                            <div className={styles['skeleton-footer']}>
                                <div className={`${styles['skeleton-text']} shimmer`} style={{ width: '40%', height: '24px' }} />
                                <div className={`${styles['skeleton-btn']} shimmer`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (type === 'categories') {
        return (
            <div className={styles['categories-scroll']}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`${styles['skeleton-category']} shimmer`} />
                ))}
            </div>
        );
    }

    return (
        <div style={{ position: overlay ? "fixed" : "relative" }} className={styles['wrapper']}>
            <div className={styles['modern-spinner']}>
                <div className={styles['spinner-ring']}></div>
            </div>
        </div>
    );
}

export default Loading;