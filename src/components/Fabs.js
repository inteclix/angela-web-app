import React from "react"
import HandleClickOutside from "./HandleClickOutside"
import {
  IoIosMenu
} from "react-icons/io";
export const Fab = ({ onClick, Icon }) => (
  <div
    onClick={onClick}
    style={{
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: "lightgray",
      justifyContent: "center",
      alignItems: "center",
      margin: 3,
      justifyContent: "center",
      alignItems: "center"
    }}>
    <Icon size={24} />
  </div>
)

export default class Fabs extends React.Component {
  constructor() {
    super()
    this.state = {
      showFab: false
    }
  }
  render() {
    return (
      <HandleClickOutside
        handleclick={() => this.setState({ showFab: false })}
      >
        <div
          onClick={() => this.setState({ showFab: !this.state.showFab })}
          style={{
            position: "absolute",
            width: 50,
            height: 50,
            borderRadius: 25,
            right: 10,
            bottom: 10,
            backgroundColor: "#3F51B5",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <IoIosMenu size={24} color="white" />
          <div style={{
            position: "absolute",
            bottom: 53
          }}>
            {
              this.state.showFab && this.props.children
            }
          </div>
        </div>
      </HandleClickOutside>

    )
  }
}