import Image from "next/image";
import localFont from "next/font/local";
// import bellIcon from "@/assets/img/icon/bell.svg"
// import bellIcon from "@/assets/img/icon/bell.svg"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Card=()=>{
  return(
    <div className="card-container">

    </div>
  )
}

export default function Home() {
  return (
    <div
    style={{padding:'62px 42px'}}
     className="app-container"
    >
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} className="banner">
        <div style={{display:'flex',flexDirection:'column',justifyContent:'left'}} className="banner-block-1">
          <div className="active-leads">
            <Image src="/assets/img/title.png" width={146} height={34}  alt="" />
            <div className="add-more-container">
               <Image  src="/assets/img/avatar-2.png" width={38} height={38}  alt="" />
               <Image  src="/assets/img/avatar-1.png" width={38} height={38}  alt="" />
               <div className="add-more-button">
                   <Image  src="/assets/img/add-button.png" width={18} height={18}  alt="" />
                   <p>Add more </p>
               </div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'left'}}>

          </div>
        </div>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'right'}} className="banner-block-2">
          <div style={{width:'300px',height:'60px'}} className="input-container">
            <input placeholder="Search ..." className="input" ></input>
            <Image src="/assets/img/search-icon.png" width={22} height={22}  alt="" />
          </div>
          <div style={{width:'142px',height:'60px'}} className="input-container">
          <p  className="drop=down-text" >All Times </p>
          <Image src="/assets/img/down-arrow.png" width={13} height={7}  alt="" />
          </div>
          <div style={{width:'60px',height:'60px'}} className="button-container">
              <Image src="/assets/img/bell.png" width={22} height={22}  alt="" />
          </div>
          <div style={{width:'60px',height:'60px'}} className="button-container">
              <Image src="/assets/img/germany.png" width={22} height={22}  alt="" />
          </div>
          <div className="button-container">

          </div>
          </div>
      </div>
      <div className="sub-container">
        {["To Do´s","In Progress","Review","Closed"].map((item,index)=>{
          return(
            <div className="coloum" >
              <div className="head">
<p>{item}</p><div> <div className="count"> {index+1}</div> <Image className="dot" src="/assets/img/three-dot.png" width={28} height={6}  alt="" /> </div>
              </div>
              <div className="add-more-container">
                {
                  index === 0 && (
                    <div className="add-more-button">
                    <Image  src="/assets/img/add-button.png" width={18} height={18}  alt="" />
                    <p> Create Task </p>
                    </div>
                  )
                }
              </div>
              <div className="body">

              <div className="card-container"> 
                  <div className="card-inner-container">
                    <div className="card-head">
                    <div className="card-status">
                      LOW
                    </div>
                    <Image className="dot" src="/assets/img/three-dot.png" width={18} height={5}  alt="" /> 
                    </div>
                    <div className="card-task-title">Task Title</div>
                    <p className="title-descriptionn"> Task description but it is only displaying a maximum of 150 letters... </p>
                    <div className="card-footer">
                      
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
