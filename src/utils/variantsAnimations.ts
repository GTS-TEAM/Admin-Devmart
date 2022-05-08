import { TYPE_VARIANTS } from 'constant';
import { Variants } from 'framer-motion';

export const dropIn: Variants = {
   [TYPE_VARIANTS.HIDDEN]: {
      y: '-100vh',
      opacity: 1,
   },
   [TYPE_VARIANTS.VISIBLE]: {
      y: '0',
      opacity: 1,
      transition: {
         duration: 0.3,
         type: 'spring',
      },
   },
   [TYPE_VARIANTS.EXIT]: {
      y: '-100vh',
      opacity: 1,
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

export const moveUpDropdown: Variants = {
   [TYPE_VARIANTS.HIDDEN]: {
      opacity: 1,
      y: 10,
   },
   [TYPE_VARIANTS.VISIBLE]: {
      opacity: 1,
      y: 0,
      transition: {
         duration: 0.3,
         type: 'spring',
      },
   },
   [TYPE_VARIANTS.EXIT]: {
      opacity: 0,
      y: 10,
   },
};
