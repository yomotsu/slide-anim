import {
  slideExpand,
  slideCollapse,
} from  './slide-anim';
export {
  slideExpand,
  slideCollapse,
  slideStop,
  isVisible
} from  './slide-anim';

// backward compatibility aliases
export const slideDown = slideExpand;
export const slideUp = slideCollapse;
