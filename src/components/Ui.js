import React from "react"

export const Label = ({ children, label }) => (
  <div style={{ padding: 2, borderRadius: 7, margin: 3, borderLeftWidth: 2, borderLeftColor: "gray", borderLeftStyle: "solid" }} >
    <label style={{ marginLeft: 5 }} >{label}</label>
    {children}
  </div>
)