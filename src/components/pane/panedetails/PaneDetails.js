import React from "react";
import { Row, Col, Divider, Button } from "antd"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import thermometer from "../../../assets/images/thermometer.png"
import styles from "./style.module.css"

const Header = ()=>{
  return (
    <div>
      <p className={styles.description}>Device state</p>
      <h2>Room temperature</h2>
    </div>
  )
}

const GadgetDetailsControl = ()=>{
  const degree = 17
  return(
    <div>
      <Row justify="center" align="top">
        <Col span={24} className={styles.topCol}><strong>20<span className={styles.celcius}>C</span></strong></Col>
        <Col span={24}  className={styles.topCol}>l</Col>
      </Row>
      <Row justify="space-between" align="middle">
        <Col span={3}  className={styles.chartLabels}>
          <strong>10<span className={styles.celcius}>C</span></strong> <Divider />
        </Col>
        <Col span={17}>
          <CircularProgressbarWithChildren
            className={styles.progressCircleContainer}
            value={60}
            circleRatio={1}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "butt",
              trailColor: "#eee",
              pathColor:"#1890ff"
            })}
            >
              <img className={styles.thermometer} src={thermometer} alt="" />
              <div className={styles.tempDeg}>
                <strong>{degree}<span className={styles.celcius}>C</span></strong>
              </div>
            </CircularProgressbarWithChildren>
        </Col>
        <Col span={3} className={styles.chartLabels}>
          <Divider /><strong style={{marginLeft:2}}> 30<span className={styles.celcius}>C</span></strong>
        </Col>
      </Row>

    </div>
  )
}

const Range = ()=>{
  return(
    <Row justify="center" align="top" className={styles.range}>
      <Col span={24} className={styles.rangeh5}><h5>Range</h5></Col>
      <Col span={24} className={styles.rangeh2}><h2>-20 to +60</h2></Col>
    </Row>
  )
}

const LastUpdate = ()=>{
  return(
    <Row justify="center" align="top" className={styles.lastUpdate}>
      <h5>Last Update</h5>
      <h1>27/10/2020 13:46</h1>
    </Row>
  )
}

const SensorStatus = ()=>{
  return(
    <Row justify="center" align="top" className={styles.sensorStatus}>
      <h5>Sensor Status</h5>
      <h1>Connected</h1>
    </Row>
  )
}

const ControlHeroButton = ()=>{
  return(
    <Row justify="center" align="top" className={styles.refreshButton}>
      <Button type="primary" size={"large"}>
          REFRESH
      </Button>
    </Row>
  )
}

const PaneDetails = (props) => {
  return (
    <div className={styles.rightSideComponent}>
      <Header />
      <GadgetDetailsControl />
      <Range />
      <LastUpdate />
      <SensorStatus />
      <ControlHeroButton />
    </div>
  )
}

export default PaneDetails
