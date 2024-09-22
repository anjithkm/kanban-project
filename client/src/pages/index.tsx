import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import Card from "@/components/card";
import LanguageSwitcher from '../components/languageSwitcher';
import { useTranslation } from 'react-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';

// Type definition for Task
interface Task {
  id: string,
  title: string,
  description: string,
  comments: number,
  files: number,
  priority : "LOW" | "MEDIUM" | "HIGH"
}

// Type for State
type StateType = Task[][];
type NewStateType = Task

// fake data generator
const getItems = (count: number, offset = 0): Task[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${Math.random()}`,
    title: `item ${k + offset}`,
    description:"descriptions ...",
    comments: 10,
    files:0,
    priority:"LOW"
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


// Moves an item from one list to another list.
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
const apiUrl = "http://localhost:8080/task" 

// Styling helpers
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  margin: `${grid}px 0px`,
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  backgroundColor: isDraggingOver ? "lightblue" : "#FFFBF5",
  marginRight:`${grid}px`,
  paddingBottom:`${grid}px`,
  width: '347px',
  minWidth:'347px'
});


export default function Home() {

  const { t } = useTranslation('common');
  const [id,setId] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [createTask,setCreateTask] = useState<boolean>(false)
  const [prevstate, setPrevState] = useState<StateType>([]);
  const [state, setState] = useState<StateType>([]);
  const [search, setSearch] = useState<string>("");
  const [newItem, setNewItem] = useState<NewStateType>({
    id: `${Math.floor(Math.random()*Math.pow(10,15))}`,
    title: "Title",
    description: "Descriptions ...",
    comments: 10,
    files: 0,
    priority:"LOW"
  },);

  useEffect(() => {
    if (createTask) {
      document.body.classList.add('no-scroll');
      window.scrollTo(0, 0);
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };

  }, [createTask]);

  useEffect(()=>{
  setState([[],[],[],[]])
  const fetchData = async () => {

    try {
      await axios.get('http://localhost:8080');
    } catch (error) {
      alert("Can't connect to 'http://localhost:8080, Try again")
    }

    try {
        const { data } = await axios.get(apiUrl);
        if(data.success){
          setState(data?.data?.tasks)
          setId(data?.data?._id)
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  fetchData();
  },[])

  useEffect(() => {
    // Ensure translations are ready before rendering
    if (t('welcome')) {
      setIsLoading(false);
    }
  }, [t]);

  // Handle drag and drop end
  async function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    setPrevState(state)

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
      const newState = [...state];
    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      newState[sInd] = items;

      updateData(newState)

    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      updateData(newState)
     
    }

  }

  function HandleCreateTask(){
      setCreateTask(false)
      setPrevState(state)
      const newState = [[{...newItem, id: `${Math.floor(Math.random()*Math.pow(10,15))}`},...state[0]],state[1],state[2],state[3]]
      updateData(newState)
  }

  function HandleDeleteTask(ind:number,index:number){
    
      const newState = [...state];
      newState[ind].splice(index, 1);

      updateData(newState)
 
  }

  async  function  updateData ( state:StateType ) {

    // Automatic Api calling card drag dropdown

    if(state.length != 0  ){

      setState(state)

      if(id == undefined){

        try {

          const {data} = await axios.post(apiUrl, {
              tasks: state
          });

          // if(data.success){
          //   setState(data?.data?.tasks)
          // }

          console.log('data posted:', data?.data?.tasks);

        } catch (error) {
            console.error('Error creating post:', error);
            setState(prevstate)
        }

      }else{

        try {
          const {data} = await axios.patch(apiUrl+'/'+`${id}`, {
              tasks: state
          });
          
          // if(data.success){
          //   setState(data?.data?.tasks)
          // }
          
          console.log('data patched:', data?.data?.tasks);

        } catch (error) {
            console.error('Error creating post:', error);
            setState(prevstate)
        }

      }

}
}

  return (
    <div
     className="py-[62px] px-[42px] md:py-[62px] md:px-[42px] sm:py-[40px] sm:px-[15px] bg-[#FFFBF5]"
    >
      <div  className="flex flex-col-reverse justify-left md:flex-col-reverse md:justify-left lg:flex-row lg:justify-between xl:flex-row xl:justify-between 2xl:flex-row 2xl:justify-between">
        <div className="flex flex-col justify-start min-w-[300px]">
          <div className="font-inter text-[28px] font-normal leading-[33.89px] text-left">
          { !isLoading && <p className="font-inter text-[28px] font-normal leading-[33.89px] text-left">{t('Active_Leads')}</p> }
            <div className="flex flex-row justify-start items-center">
               <Image  src="/assets/img/avatar-2.png" width={38} height={38}  alt="" />
               <Image className="ml-[-8px]" src="/assets/img/avatar-1.png" width={38} height={38}  alt="" />
               <div className="flex ml-[8px] justify-between items-center w-fit cursor-pointer" 
                       onClick={() => {
          setState([...state, []]);
        }}
               >
                   <Image  src="/assets/img/add-button.png" width={18} height={18}  alt="" />
                   <p className="ml-2 font-inter text-base font-medium leading-5 text-left text-[#190041] underline underline-offset-[3px]"> { !isLoading && t("Add_More")}</p>
               </div>
            </div>
          </div>
          <div className="flex flex-row justify-start">

          </div>
        </div>
          <div className="flex flex-col-reverse justify-left mb-5 sm:flex-col-reverse sm:justify-left sm:mb-5 md:flex-row md:justify-left lg:flex-row lg:justify-right xl:flex-row xl:justify-right 2xl:flex-row 2xl:justify-right">

          <div  className="flex justify-between p-5 items-center font-inter text-[16px] font-normal leading-[19.36px] text-left w-[300px] h-[60px] bg-[#FDF4E6] border border-[#190041] rounded-[6px] mr-[20px]">
            <input className="bg-transparent font-inter text-base font-normal font-inter text-base font-normal leading-5 text-left leading-5 text-left placeholder-[#190041] text-[#190041]" placeholder={ !isLoading && String(t('Search')+"...") || ""}  onChange={(e)=>{setSearch(e.target.value)}} ></input>
            <Image src="/assets/img/search-icon.png" width={22} height={22}  alt="" />
          </div>
          <div className="flex flex-row w-full mb-5 justify-end md:w-full md:mb-5 lg:w-full lg:justify-end xl:w-[400px] 2xl:w-[400px]">

            <div  className="w-[142px] h-[60px] bg-[#FDF4E6] border border-[#190041]  rounded-[8px] flex justify-between p-5 items-center font-inter text-[16px] font-normal leading-[19.36px] text-left">
            <p className="text-[#190041] font-inter text-base font-normal leading-5 text-left" > { !isLoading && t('All_Times') } </p>
            <Image src="/assets/img/down-arrow.png" width={13} height={7}  alt="down-arrow" />
            </div>
            <div  className="w-[60px] ml-[20px] bg-[#FDF4E6] border border-[#190041] rounded-[8px] h-[60px] flex justify-center items-center font-inter text-[16px] font-normal leading-[19.36px] text-left">
                <Image src="/assets/img/bell.png" width={22} height={22}  alt="bell" />
            </div>
            <div  className="w-[60px] ml-[20px] bg-[#FDF4E6] border border-[#190041] rounded-[8px] h-[60px] flex justify-center items-center font-inter text-[16px] font-normal leading-[19.36px] text-left">
                <LanguageSwitcher />
            </div>
            <div className="flex  w-[60px] ml-[20px] rounded-full border border-[#190041] bg-[#190041] h-[60px] justify-center items-center font-inter text-[16px] font-normal leading-[19.36px] text-left">

            </div>

          </div>

          </div>
      </div>
      <div className="flex flex-col overflow-auto min-h-[calc(100vh-180px)]">
      <div className="w-full flex flex-row mt-16">
        { !isLoading &&  [t("To_Do_s"),t("In_Progress"),t("Review"),t("Closed")].map((item,index)=>{
          return(
            <div className="w-[347px] h-full mr-4" key={index} >
                <div className="w-[347px] h-[65px] bg-[#FDF4E6] rounded-[8px] flex justify-between items-center">
                <p className="ml-[26.5px] font-inter text-[18px] font-bold leading-[21.78px] text-left">{item}</p>
                <div className="mr-[26.5px] flex flex-row items-center justify-between"> 
                   <div className="rounded-[20px] bg-[#190041] h-[28px] w-[40px] flex font-inter text-[16px] font-normal leading-[19.36px] text-left items-center justify-center text-[#FFFBF5]"> {index+1}
                </div> <Image className="ml-[10px]" src="/assets/img/three-dot.png" width={28} height={6}  alt="" /> </div>
                 </div>
              <div className="flex flex-row mt-2 justify-center items-center w-[347px]">
                {
                  index === 0 && (
                    <div className="flex justify-between items-center w-fit cursor-pointer"
                             onClick={() => {
                            setCreateTask(true);
                          }}
                      >
                    <Image  src="/assets/img/add-button.png" width={18} height={18}  alt="addbutton" />
                    <p className="ml-2 font-inter text-base font-medium leading-5 text-left text-[#190041] underline underline-offset-[3px]"> {t("Create_Task")}</p>
                    </div>
                  )
                }
              </div>
              {
                      createTask && (
                        <div className="absolute h-full w-full flex top-0 left-0 bg-[#17171715]" >
                        <Card create={true} item={newItem} setItem={setNewItem} setCreateTask={setCreateTask} HandleCreateTask={HandleCreateTask}  />
                    </div>
                      )
                    }
            </div>
          )
        })}
      </div>
      <div className="flex">
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
                          <div className="w-[347px] h-full mr-4">

                              <Card create={false} item={item}  ind={ind} index={index} HandleDeleteTask={HandleDeleteTask} search={search}/>
                    
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

    </div>
  );
}

// Fetch translations for both languages
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
