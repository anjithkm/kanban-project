

// import React, { useState } from "react";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });


import React, { useState } from "react";
import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";

// Type definition for Task
interface Task {
  id: string;
  content: string;
}

// Type for State
type StateType = Task[][];

// fake data generator
const getItems = (count: number, offset = 0): Task[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }))


// Reorder function with types
const reorder = (
  list: Task[],
  startIndex: number,
  endIndex: number
): Task[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: Task[],
  destination: Task[],
  droppableSource: { index: number; droppableId: string },
  droppableDestination: { index: number; droppableId: string }
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: Task[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 16;

// Styling helpers
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  // padding: grid * 2,
  // marginRight:`${grid}px`,
  margin: `${grid}px 0px`,
  // background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "#FFFBF5",
  marginRight:`${grid}px`,
  width: 347
});


export default function Home() {
  const [state, setState] = useState<StateType>([
  [
    {
      id: `1-${new Date().getTime()}`,
      content: "To Do's"
    }
  ],[
    {
      id: `2-${new Date().getTime()}`,
      content: "In Progress"
    }
  ],
  [
    {
      id: `3-${new Date().getTime()}`,
      content: "Review"
    }
  ],
  [
    {
      id: `4-${new Date().getTime()}`,
      content: "Closed"
    }
  ]
]);

  // Handle drag and drop end
  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }
  const [ CreateTask,setCreateTask] = useState(false)
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
               <div className="add-more-button" 
                       onClick={() => {
          setState([...state, []]);
        }}
               >
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
        {["To Do's","In Progress","Review","Closed"].map((item,index)=>{
          return(
            <div className="coloum" key={index} >
              <div className="head">
                <p>{item}</p><div> <div className="count"> {index+1}</div> <Image className="dot" src="/assets/img/three-dot.png" width={28} height={6}  alt="" /> </div>
              </div>
              <div className="add-more-container">
                {
                  index === 0 && (
                    <div className="add-more-button"
                    //  onClick={()=>setCreateTask(true)}
                             onClick={() => {
          setState([...state, getItems(1)]);
        }}
                      >
                    <Image  src="/assets/img/add-button.png" width={18} height={18}  alt="" />
                    <p> Create Task </p>
                    </div>
                  )
                }
              </div>
              {
                      CreateTask && (

                        <div className="create-task" style={{position:"absolute",height:'100%',width:'100%',display:'flex',backgroundColor:'red',top:0,left:0}} >
                        
                        <div className="card-container" style={{margin:"auto"}} > 
                          <div className="card-inner-container" >
                            <div className="card-head">
                            <div className="card-status">
                              LOW
                            </div>
                            <Image className="dot" src="/assets/img/three-dot.png" width={18} height={5}  alt="" /> 
                            </div>
                            <div className="card-task-title">Task Title</div>
                            <p className="title-description"> Task description but it is only displaying a maximum of 150 letters... </p>
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
                          </div>
                        </div>
    
                    </div>
                      )
                    }
              <div className="body">

                {/* <div style={{position:"absolute",height:'100%',width:'100%',display:'flex',backgroundColor:'red',top:0,left:0}} > */}

                    <div className="card-container"> 
                      <div className="card-inner-container" >
                        <div className="card-head">
                        <div className="card-status">
                          LOW
                        </div>
                        <Image className="dot" src="/assets/img/three-dot.png" width={18} height={5}  alt="" /> 
                        </div>
                        <div className="card-task-title">Task Title</div>
                        <p className="title-description"> Task description but it is only displaying a maximum of 150 letters... </p>
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
                      </div>
                    </div>

                {/* </div> */}

              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                            
                         >

                          <div className="coloum">


                  <div className="head">
                <p>{item.content}</p><div> <div className="count"> {index+1}</div> <Image className="dot" src="/assets/img/three-dot.png" width={28} height={6}  alt="" /> </div>
              </div>
              <div className="add-more-container">
                {
                  item.content === "To Do's" && (
                    <div className="add-more-button"
                    //  onClick={()=>setCreateTask(true)}
                             onClick={() => {
          setState([...state, getItems(1)]);
        }}
                      >
                    <Image  src="/assets/img/add-button.png" width={18} height={18}  alt="" />
                    <p> Create Task </p>
                    </div>
                  )
                }
              </div>
              {
                      CreateTask && (

                        <div className="create-task" style={{position:"absolute",height:'100%',width:'100%',display:'flex',backgroundColor:'red',top:0,left:0}} >
                        
                        <div className="card-container" style={{margin:"auto"}} > 
                          <div className="card-inner-container" >
                            <div className="card-head">
                            <div className="card-status">
                              LOW
                            </div>
                            <Image className="dot" src="/assets/img/three-dot.png" width={18} height={5}  alt="" /> 
                            </div>
                            <div className="card-task-title">Task Title</div>
                            <p className="title-description"> Task description but it is only displaying a maximum of 150 letters... </p>
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
                          </div>
                        </div>
    
                    </div>
                      )
                    }
                     <div className="card-container"> 
                      <div className="card-inner-container" >
                        <div className="card-head">
                        <div className="card-status">
                          LOW
                        </div>
                        <Image className="dot" src="/assets/img/three-dot.png" width={18} height={5}  alt="" /> 
                        </div>
                        <div className="card-task-title">Task Title</div>
                        <p className="title-description"> Task description but it is only displaying a maximum of 150 letters... </p>
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
                      </div>
                    </div>
                          </div>

                          </div>

                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>

    </div>
  );
}

// const QuoteApp: React.FC = () => {

//   const [state, setState] = useState<StateType>([]);

//   // Handle drag and drop end
//   function onDragEnd(result: DropResult) {
//     const { source, destination } = result;

//     // Dropped outside the list
//     if (!destination) {
//       return;
//     }
//     const sInd = +source.droppableId;
//     const dInd = +destination.droppableId;

//     if (sInd === dInd) {
//       const items = reorder(state[sInd], source.index, destination.index);
//       const newState = [...state];
//       newState[sInd] = items;
//       setState(newState);
//     } else {
//       const result = move(state[sInd], state[dInd], source, destination);
//       const newState = [...state];
//       newState[sInd] = result[sInd];
//       newState[dInd] = result[dInd];

//       setState(newState.filter((group) => group.length));
//     }
//   }

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={() => {
//           setState([...state, []]);
//         }}
//       >
//         Add new group
//       </button>
//       <button
//         type="button"
//         onClick={() => {
//           setState([...state, getItems(1)]);
//         }}
//       >
//         Add new item
//       </button>
      // <div style={{ display: "flex" }}>
      //   <DragDropContext onDragEnd={onDragEnd}>
      //     {state.map((el, ind) => (
      //       <Droppable key={ind} droppableId={`${ind}`}>
      //         {(provided, snapshot) => (
      //           <div
      //             ref={provided.innerRef}
      //             style={getListStyle(snapshot.isDraggingOver)}
      //             {...provided.droppableProps}
      //           >
      //             {el.map((item, index) => (
      //               <Draggable
      //                 key={item.id}
      //                 draggableId={item.id}
      //                 index={index}
      //               >
      //                 {(provided, snapshot) => (
      //                   <div
      //                     ref={provided.innerRef}
      //                     {...provided.draggableProps}
      //                     {...provided.dragHandleProps}
      //                     style={getItemStyle(
      //                       snapshot.isDragging,
      //                       provided.draggableProps.style
      //                     )}
      //                   >
      //                     <div
      //                       style={{
      //                         display: "flex",
      //                         justifyContent: "space-around"
      //                       }}
      //                     >
      //                <div className="card-container"> 
      //                 <div className="card-inner-container" >
      //                   <div className="card-head">
      //                   <div className="card-status">
      //                     LOW
      //                   </div>
      //                   <Image className="dot" src="/assets/img/three-dot.png" width={18} height={5}  alt="" /> 
      //                   </div>
      //                   <div className="card-task-title">Task Title</div>
      //                   <p className="title-description"> Task description but it is only displaying a maximum of 150 letters... </p>
      //                   <div className="card-footer">
      //                   <Image  src="/assets/img/avatar-3.png" width={24} height={24}  alt="" />
      //                   <div className="container">
      //                     <div className="content-wrapper">
      //                     <Image src="/assets/img/message.png" width={16} height={16}  alt="" />
      //                     <div className="text">12 comments</div>
      //                     </div>
      //                     <div className="content-wrapper">
      //                     <Image  src="/assets/img/file.png" width={16} height={16}  alt="" />
      //                     <div className="text">0 files</div>
      //                     </div>
      //                   </div>
      //                   </div>
      //                 </div>
      //               </div>
      //                       {/* {item.content}
      //                       <button
      //                         type="button"
      //                         onClick={() => {
      //                           const newState = [...state];
      //                           newState[ind].splice(index, 1);
      //                           setState(
      //                             newState.filter((group) => group.length)
      //                           );
      //                         }}
      //                       >
      //                         delete
      //                       </button> */}
      //                     </div>
      //                   </div>
      //                 )}
      //               </Draggable>
      //             ))}
      //             {provided.placeholder}
      //           </div>
      //         )}
      //       </Droppable>
      //     ))}
      //   </DragDropContext>
      // </div>
//     </div>
//   );
// };

// export default QuoteApp;


