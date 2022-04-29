import { TYPE_VARIANTS } from 'constant';
import { Variants } from 'framer-motion';

export const dropIn: Variants = {
   [TYPE_VARIANTS.HIDDEN]: {
      y: '-100vh',
      opacity: 0,
   },
   [TYPE_VARIANTS.VISIBLE]: {
      y: '0',
      opacity: 1,
      transition: {
         duration: 0.1,
         type: 'spring',
         damping: 25,
         stiffness: 500,
      },
   },
   [TYPE_VARIANTS.EXIT]: {
      y: '-100vh',
      opacity: 0,
   },
};

export const FadeIn: Variants = {
   [TYPE_VARIANTS.HIDDEN]: {
      opacity: 0,
   },
   [TYPE_VARIANTS.VISIBLE]: {
      opacity: 1,
   },
   [TYPE_VARIANTS.EXIT]: {
      opacity: 0,
   },
};
