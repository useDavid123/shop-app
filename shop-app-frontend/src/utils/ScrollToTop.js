import {useEffect} from 'react'
import { useScrollTo } from "react-use-window-scroll";
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({pathname}) => {
  // const {pathname} = useLocation();
  const scrollTo = useScrollTo();
  useEffect(() => {
    // location.reload()
   
    // scrollTo(0, 0)
  }, [pathname])

  return null  
}


export default ScrollToTop
