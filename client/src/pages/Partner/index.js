import React from 'react'
import{Tabs} from "antd"
import TheatreList from './TheatreList'
function Partner(){

  const items =[
    {
      key:"1",
      label:"Theatre",
      children: <TheatreList />
    }
  ]
  return (
    <>
    <h3>Partner page</h3>
    <Tabs items={items}/>
    </>
  )
}

export default Partner
