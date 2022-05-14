import { useEffect } from 'react';
export const useBodyOverflow = (isOpen: boolean) => {
   useEffect(() => {
      const body = document.querySelector('body');

      if (body) {
         if (isOpen) {
            body.style.overflow = 'hidden';
         } else {
            body.style.overflow = 'unset';
         }
      }
   }, [isOpen]);
};
