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
    menuPath: '/admin/menu-management',
  },
];

const HorizonMenu = () => {
  const [menus] = useState<Menu[]>(mockMenus);
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
