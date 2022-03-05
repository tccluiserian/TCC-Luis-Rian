import { useState, useEffect } from 'react';

const mediaQuery = window.matchMedia('(min-width: 1200px)');

export function useIsLargeHeader() {
  
  const [large, setLarge] = useState(true);
  
  useEffect(() => {    
    
    const mqFunc = (mq) => {
        if (mq.matches) {

            setLarge(true)

        } else {

            setLarge(false)
        }
    }   
    
    mqFunc(mediaQuery)

    mediaQuery.addListener(mqFunc)
    
    return () => {
        mediaQuery.removeListener(mqFunc)
    };

  }, []);

  return large;
}