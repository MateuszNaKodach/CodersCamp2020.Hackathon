import {createContext} from 'react';

export const defaultObject = {
  isOpenDrawer: false,
  handleDrawerClose: ()=>{},
};

export const AppContext= createContext(defaultObject);