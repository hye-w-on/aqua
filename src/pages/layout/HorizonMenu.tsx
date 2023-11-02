import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface Menu {
  menuName: string;
  menuPath: string;
  subMenus?: Menu[];
}

const mockMenus: Menu[] = [
  {
    menuName: '메뉴1',
    menuPath: '/menu1',
    subMenus: [
      {
        menuName: '메뉴1-1',
        menuPath: '/menu1-1',
      },
      {
        menuName: '메뉴1-2',
        menuPath: '/menu1-2',
      },
    ],
  },
  {
    menuName: '메뉴2',
    menuPath: '/menu2',
    subMenus: [
      {
        menuName: '메뉴2-1',
        menuPath: '/menu2-1',
      },
      {
        menuName: '메뉴2-2',
        menuPath: '/menu2-2',
      },
    ],
  },
  {
    menuName: 'BBS',
    menuPath: '/bbs',
  },
  {
    menuName: 'Reservation',
    menuPath: '/reservation',
  },
  {
    menuName: 'Feed',
    menuPath: '/feed',
  },
  {
    menuName: 'Menu Management',
    menuPath: '/menu-management',
  },
];

const HorizonMenu = () => {
  const [menus, setMenus] = useState<Menu[]>(mockMenus);
  return (
    <span>
      {menus &&
        menus.map((menu, index) => {
          return (
            <Span key={index}>
              <Link to={menu.menuPath}>{menu.menuName}</Link>
            </Span>
          );
        })}
      <hr />
    </span>
  );
};

export default HorizonMenu;

const Span = styled.span`
  margin: 10px;
  vertical-align: middle;
  // border: 1px solid black;
`;
