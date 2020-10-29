import React, {useState} from "react";
import twoRect from "../../../assets/images/two-rectangles.png"
import oneRect from "../../../assets/images/one-rect.png"
import styles from "./style.module.css"

const data = ["Livingroom", "Bedroom", "Kitchen", "Office", "Cellar",
  "Livingroom1", "Bedroom1", "Kitchen1", "Office1", "Cellar1",
  "Livingroom2", "Bedroom2", "Kitchen2", "Office2", "Cellar2", "Testing"  ]

const RoomSelectionItem = (props) =>{
  const { title, setSelected, index, selected = false} = props
  return (
    <div className={`${styles.elemetContainer} ${selected ? styles.elementSelected : ""}`} onClick={()=>setSelected(title)}>
      <h3>{title}</h3>
      {index % 2 === 0?<img className={styles.imagesClass} src={twoRect} alt="" /> : <img className={styles.imagesClass} src={oneRect} alt="" />}
    </div>
  )
}

const ControlPage = (props)=>{
  const {setRooms} = props
  const [selected, setSelected] = useState(0)

  const showNewPage = i =>{
    setSelected(i)
    setRooms(data.slice(5*i, 5*(i+1)))
  }

  const getPages = () => {
    let d = []
    const len = data.length % 5 === 0 ? parseInt(data.length / 5): parseInt(data.length/5)+1
    for (let i = 0; i < len ; i++) {
      d.push(<li className={`${styles.listItem} ${selected === i?styles.listItemSelected:""}`} key={i} onClick={()=> showNewPage(i)}> </li>)
    }
    return d
  }

  return(
    <ul className={styles.list +" ant-row ant-row-center"}>
      {
        getPages()
      }
    </ul>
  )
}

const MergeElements = (props) =>{
  const [rooms, setRooms] = React.useState(data.slice(0, 5))
  const [selected, setSelected] = React.useState(rooms[0])

  return(
    <div>
      {rooms.map((item, index)=>
        <RoomSelectionItem
          title={item}
          key={index}
          index={index}
          selected={selected === item}
          setSelected={setSelected}
        />
        )}
        <ControlPage setRooms={setRooms} />
    </div>
  )
}

const PaneRoomSelection = (props) => {
  return (
    <div  className={styles.leftSideComponent}>
      <div>
        <h2>Rooms</h2>
        <p className={styles.description}>Select the room you want xxxxx their gadgets by</p>
      </div>
      <MergeElements />
    </div>
  )
}

export default PaneRoomSelection
