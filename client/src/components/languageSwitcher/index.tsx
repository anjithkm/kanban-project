import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { FC ,useState} from 'react';
import Image from "next/image";

const LanguageSwitcher: FC = () => {
  const { t } = useTranslation('common'); 
  const router = useRouter();
  const [open,setOpen] = useState(false)
  const [language,SetLanguage] = useState('en')

  // Define the type for the locale as a string
  const changeLanguage = (locale: string) => {
    SetLanguage(locale);
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className='relative cursor-pointer' onClick={()=>{setOpen(!open)}}>

        {
            !open && language == 'de' && <Image src="/assets/img/germany.png" width={22} height={22}  alt="" />
        }
        {
            !open && language == 'en' && <Image src="/assets/img/uk.png" width={22} height={22}  alt="" />

        } 
        {
            open && (
                <div className='absolute mt-[45px] w-[100px] bg-red h-fit'>
                      <button className='border border-[#190041] rounded-[2px] p-[1px] w-full' onClick={() => changeLanguage('en')}>English</button>
                      <button className='border border-[#190041] mt-[5px] rounded-[2px] p-[1px] w-full' onClick={() => changeLanguage('de')}>German</button>
                </div>
            )
        }
    </div>
  );
};

export default LanguageSwitcher;
