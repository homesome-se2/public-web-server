import React from "react";
import { Row, Col, Input } from "antd"
import repeateIcon from "../../../assets/images/repeate-icon.png"
import styles from "./style.module.css"

const Header = ()=>{
  return(
    <Row justify="space-between">
      <Col xs={24} sm={24} md={8} lg={5}>
        <h2>Devices List</h2>
        <p className={styles.description}>All the available gadgets</p>
      </Col>
      <Col xs={24} sm={24} md={13} lg={7}>
        <Row justify="space-between">
          <Col span={20}>
            <Input
              placeholder="Type to search..."
              suffix={<div className={styles.searchIconInput}></div>}
            />
          </Col>
          <Col span={4}>
            <img className={styles.repeateIcon} src={repeateIcon} alt="" />
          </Col>
        </Row>

      </Col>
    </Row>
  )
}

const PaneActiveArea = (props) => {
  return (
    <div className={styles.mainSideComponent}>
      <Header />
    </div>
  )
}

export default PaneActiveArea
