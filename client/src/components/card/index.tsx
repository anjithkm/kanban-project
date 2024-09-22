import React, { useState, ComponentProps,useEffect } from "react";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import HighlightedText from '../highLight'
import { truncate,camalizeEachWords } from '@/utils/textFormate'


interface cardProps extends ComponentProps<any>{
    create: boolean;
    item:any;
    setItem?:any;
    setCreateTask?:any;
    HandleCreateTask?:any;
    HandleDeleteTask?:any;
    ind?:number,
    index?:number,
    search?:string
}


const Card :React.FC<cardProps> = ({create = false,item={},setItem,setCreateTask,HandleCreateTask,HandleDeleteTask,ind,index,search})=>{

  const initialItem = item ;
  
  const [del,setDel] = useState(false);
  const { t } = useTranslation('common');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure translations are ready before rendering
    if (t('welcome')) {
      setIsLoading(false);
    }
  }, [t]);

  function HandleCancel(){
    setItem(initialItem)
    setCreateTask(false)
  }

    return(
        <div className="bg-[#FDF4E6] border border-[#190041] rounded-lg w-[347px] h-[177px] m-auto">
          
        <div className="m-2 flex flex-col">
          <div className="w-full flex flex-row items-center justify-between">
          <div className="w-[39.78px] h-[23px] rounded-tl-md opacity-1 text-white bg-[#FFB400] font-inter text-[12px] font-medium leading-[23px] text-center">
          {item.priority}
          </div>
          <div className="relative cursor-pointer" onClick={()=>{setDel(!del)}}>
             <Image className="ml-[10px]" src="/assets/img/three-dot.png" width={18} height={5}  alt="threedot" /> 
             {
              !create && del &&
              <button className="absolute ml-[-45px] border border-[#190041] rounded-[2px] p-[1px]" onClick={()=>{HandleDeleteTask(ind,index)}}>
                     {! isLoading && t("Delete")}
              </button>
             }  
          </div>
          </div>
          {
           create ?  <input className="font-inter text-[18px] font-semibold leading-[21.78px] text-left text-[#230078] mt-1" placeholder="Task Title ..." onChange={(e)=>{setItem({...item,title:e.target.value})}} ></input> :  <div className="font-inter text-[18px] font-semibold leading-[21.78px] text-left text-[#230078] mt-1"> <HighlightedText text={ camalizeEachWords(item.title) } highlight={search||""} highlightColor="red" /></div> 
          }
          {
            create ? <textarea className="font-inter text-[12px] font-normal leading-[14.52px] text-left mt-1.5 h-[70px] text-[#230078]" placeholder="Task Description ..." onChange={(e)=>{setItem({...item,description:e.target.value})}} ></textarea> : <p className="font-inter text-[12px] font-normal leading-[14.52px] text-left mt-1.5 h-[76px] text-[#230078]"> <HighlightedText text={ truncate(item.description,150) } highlight={search||""} highlightColor="red" /></p>
          }
          {
           !create ? (
            <div className="mt-auto flex flex-row justify-between h-[24px]">
            <Image  src="/assets/img/avatar-3.png" width={24} height={24}  alt="avatar" />
            <div className="flex flex-row items-center h-[24px]">
              <div className="flex flex-row ml-[15.5px]">
              <Image src="/assets/img/message.png" width={16} height={16}  alt="message" />
              <div className="flex flex-row font-inter text-[12px] font-medium leading-[16px] text-left ml-[5.5px]">{item.comments} {! isLoading && t("Comments")}</div>
              </div>
              <div className="flex flex-row ml-[15.5px]">
              <Image  src="/assets/img/file.png" width={16} height={16}  alt="file" />
              <div className="flex flex-row font-inter text-[12px] font-medium leading-[16px] text-left ml-[5.5px]">{item.files}   {! isLoading && t("Files")}</div>
              </div>
            </div>
            </div>
           ) : (
            <div className="mt-[10px] flex flex-row justify-between h-[24px]">
            <div className="flex flex-row items-center h-[24px]">
              <div className="flex flex-row ml-[15.5px]">
                <button className="border border-[#190041] rounded-[2px] p-[1px]" onClick={HandleCreateTask}>OK</button>
              </div>
              <div className="flex flex-row ml-[15.5px]">
              <button className="border border-[#190041] rounded-[2px] p-[1px]" onClick={HandleCancel}>Cancel</button>
              </div>
            </div>
            </div>
           )

          }

        </div>

      </div>
    )

}

export default Card;