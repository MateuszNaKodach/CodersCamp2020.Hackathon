import {createContext} from 'react';

export const defaultObject = {
  isOpenDrawer: false,
  handleDrawerOpen: ()=>{},
  handleDrawerClose: ()=>{},
};

export const AppContext= createContext(defaultObject);