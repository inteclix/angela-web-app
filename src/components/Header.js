import React from "react"

import { IoIosArrowBack } from "react-icons/io";

export default ({ title, history, back }) => {
  return (
    <div style={{
      flexDirection: "row",
      backgroundColor: "#3F51B5",
      color: "white",
      height: 48
    }}>
      {back && <button onClick={() => history.goBack()} style={{ marginRight: 10, display: "flex", width: 32, backgroundColor: "transparent", justifyContent: "center", alignItems: "center" }}><IoIosArrowBack /></button>}
      <div style={{
        flex: 1,
        justifyContent: "center",
        marginLeft: 20
      }}>
        {title}
      </div>
    </div>
  )
}