import styles from "./card.module.css"
import 'primeicons/primeicons.css';


const Card = () => {
    return(
        <div className={styles.container}>
            <i className="pi pi-asterisk"></i>
            <div className={styles.texts}>
                <span className={styles.title}>tbd</span>
                <span className={styles.number}>123</span>
                <span className={styles.detail}><span className={styles.positive}>hehe</span> green huh</span>

            </div>
        </div>

    )
}


export default Card