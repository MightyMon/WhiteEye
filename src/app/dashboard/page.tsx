import styles from "../ui/dashboard/dashboard.module.css"
import Card from "../ui/dashboard/card/card"
import Recent from "../ui/dashboard/recent/recent"
import Chart from "../ui/dashboard/chart/chart"
import Status from "../ui/dashboard/status/status"
const DashBoard = () => {

    return(
        <>
        {/* the div for meteor rain and the stars  */}
        <div className="star"></div>
        <div className="meteor-1"></div>
        <div className="meteor-2"></div>
        <div className="meteor-3"></div>
        <div className="meteor-5"></div>
        <div className="meteor-4"></div>
        <div className="meteor-6"></div>
        <div className="meteor-7"></div>
        <div className="meteor-8"></div>
        <div className="meteor-9"></div>
        <div className="meteor-10"></div>
        <div className="meteor-11"></div>
        <div className="meteor-12"></div>
        <div className="meteor-13"></div>
        <div className="meteor-14"></div>
        <div className="meteor-15"></div>

        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.cards}>
              <Card/>
              <Card/>
              <Card/>
            </div>
            <Recent/>
            <Chart/>
          </div>
          <div className={styles.side}>
            <Status />
          </div>
        </div>
        
        </>
        
      
    );
};

export default DashBoard