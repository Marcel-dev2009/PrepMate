// This technique is called lifting up state
"use client"
import { useState } from "react";
import Header from "@/app/components/header";
import Body from "@/app/components/body";
function PageComponent() {
 const [showlogin , setShowLogin] = useState(true);
 const [showNotes , setShowNotes] = useState(false);
 const [openNotification , setOpenNotifications] = useState(false);
  return (
   <>
   <div>
    <Header setShowLogin={setShowLogin} setShowNotes={setShowNotes}  setOpenNotifications={setOpenNotifications}/>
   </div>
    <Body showLogin={showlogin} setShowLogin={setShowLogin} showNotes={showNotes} setShowNotes={setShowNotes} openNotifications={openNotification} setOpenNotifications={setOpenNotifications}/>
   </>
  )
}
export default PageComponent

/* 
I want to share state between the login and porfile Modal
Sharing the state between header and body again header via login 
*/