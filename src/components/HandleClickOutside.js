import React from "react";
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";
/**
 * Component that alerts if you click outside of it
 */
export default class HandleClickOutside extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this.wrapperRef);
    if (!domNode || !domNode.contains(event.target)) {
      this.props.handleclick()
    }
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}

HandleClickOutside.propTypes = {
  handleclick: PropTypes.func.isRequired
};
