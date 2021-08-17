import React from 'react';
import { FaPizzaSlice, FaCartPlus, FaTable, FaUsers } from 'react-icons/fa';
import { AiFillHome, AiOutlineQuestionCircle } from 'react-icons/ai';
import { ImUsers } from "react-icons/im";
import { VscInfo } from "react-icons/vsc";

export const SideBarJSON = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
  },
  {
    title: 'Foods',
    path: '/foods',
    icon: <FaPizzaSlice />,
  },
  {
    title: 'Foods react-query',
    path: '/foods-react-query',
    icon: <FaCartPlus />,
  },
  {
    title: 'Foods react-table',
    path: '/foods-react-table',
    icon: <FaTable />,
  },
  {
    title: 'Test requests',
    path: '/queries',
    icon: <AiOutlineQuestionCircle />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FaUsers />,
  },
  {
    title: 'Users react-table',
    path: '/users-react-table',
    icon: <ImUsers />,
  },
  {
    title: 'About',
    path: '/about',
    icon: <VscInfo />,
  },
  
];
