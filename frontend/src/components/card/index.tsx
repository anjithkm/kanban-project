import React, { useState, ComponentProps,ReactElement } from "react";
import Image from "next/image";


interface cardProps extends ComponentProps<any>{
    create: boolean;
}

const Card :React.FC<cardProps> = ({create = false})=>{

    return(
        <div className="card-container"> 
          
        <div className="card-inner-container">
          <div className="card-head">
          <div className="card-status">
            LOW
          </div>
          <Image className="dot" src="/assets/img/three-dot.png" width={18} height={5}  alt="" /> 
          </div>
          {
           create ?  <input className="card-task-title" placeholder="Task Title ..."></input> :  <div className="card-task-title">Task Title</div> 
          }
          {
            create ? <textarea className="title-description" placeholder="Task Title ..."></textarea> : <p className="title-description"> Task description but it is only displaying a maximum of 150 letters... </p>
          }
          {
           !create && (
            <div className="card-footer">
            <Image  src="/assets/img/avatar-3.png" width={24} height={24}  alt="" />
            <div className="container">
              <div className="content-wrapper">
              <Image src="/assets/img/message.png" width={16} height={16}  alt="" />
              <div className="text">12 comments</div>
              </div>
              <div className="content-wrapper">
              <Image  src="/assets/img/file.png" width={16} height={16}  alt="" />
              <div className="text">0 files</div>
              </div>
            </div>
            </div>
           ) 

          }

        </div>

      </div>
    )

}