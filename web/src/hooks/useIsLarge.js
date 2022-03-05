import { useState, useEffect } from 'react';

const mediaQuery = window.matchMedia('(min-width: 769px)');

export function useIsLarge() {
  
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