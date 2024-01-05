import React, { useContext, createContext, useState, useEffect } from 'react';

import styled from '@emotion/styled';
import MenuTreeItem from './MenuTreeItem';
import { Menu } from '../../pages/MenuManagementPage';
import { v4 as uuid } from 'uuid';
import { CrudCode } from '../../models/Common.enum';

export interface MenuTreeProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Menu[];
  expandLevel?: number;
  hasCheckBox?: boolean;
}
export type MenuTreeContextType = {
  menusContextValue: Menu[];
  updateMenusContextValue: (value: Menu[]) => void;
  insertChildMenuItem: (menuNo: string) => void;
  updateMenuItem: (menuNo: string, menu: Menu) => void;
  deleteMenuItem: (menuNo: string) => void;
  updateMenuOrder: (targetMenu: Menu, orderDifference: number) => void;
};

export const MenuTreeContext = createContext<MenuTreeContextType>({
  menusContextValue: [],
  updateMenusContextValue: (value: Menu[]) => {},
  insertChildMenuItem: (menuNo: string) => {},
  updateMenuItem: (menuNo: string, menu: Menu) => {},
  deleteMenuItem: (menuNo: string) => {},
  updateMenuOrder: (targetMenu: Menu, orderDifference: number) => {},
});

const MenuTree = (props: MenuTreeProps) => {
  const [menusContextValue, setMenusContextValue] = useState<Menu[]>(props.data);

  const updateMenusContextValue = (value: Menu[]) => {
    setMenusContextValue(value);
  };

  /* 불변성 위반으로 사용하지 않고, map + filter로 변경 */
  const deleteMenuWithRecursiveOld = (menus: Menu[], targetmenuNo: string): Menu[] => {
    return menus.filter((menu) => {
      if (menu.menuNo === targetmenuNo) {
        return false;
      }
      if (menu.subMenus) {
        menu.subMenus = deleteMenuWithRecursiveOld(menu.subMenus, targetmenuNo); //불변성 위반
      }
      return true;
    });
  };

  const deleteMenuWithRecursive = (menus: Menu[], targetmenuNo: string): Menu[] => {
    return menus
      .map((menu) => {
        if ((menu.menuNo && menu.menuNo === targetmenuNo) || menu.tempmenuNo === targetmenuNo) {
          return { ...menu, action: CrudCode.DELETE };
        }
        if (menu.subMenus) {
          return { ...menu, subMenus: deleteMenuWithRecursive(menu.subMenus, targetmenuNo) };
        }
        return menu;
      })
      .filter((menu) => menu.action !== CrudCode.DELETE);
  };

  const deleteMenuItem = (menuNo: string) => {
    setMenusContextValue(deleteMenuWithRecursive(menusContextValue, menuNo));
  };

  const insertChildMenuWithRecursive = (menus: Menu[], targetmenuNo: string): Menu[] => {
    return menus.map((menu) => {
      if ((menu.menuNo && menu.menuNo === targetmenuNo) || menu.tempmenuNo === targetmenuNo) {
        const newMenu = {
          menuNo: '',
          tempmenuNo: uuid(),
          menuName: '',
          menuPath: '/',
          parentMenuNo: menu.menuNo,
          action: CrudCode.CREATE,
          sortOrder: menu.subMenus ? String(menu.subMenus.length) : '0',
        };
        return {
          ...menu,
          subMenus: menu.subMenus ? [...menu.subMenus, newMenu] : [newMenu],
        };
      }
      if (menu.subMenus) {
        return { ...menu, subMenus: insertChildMenuWithRecursive(menu.subMenus, targetmenuNo) };
      }
      return menu;
    });
  };

  const insertChildMenuItem = (menuNo: string) => {
    setMenusContextValue(insertChildMenuWithRecursive(menusContextValue, menuNo));
  };

  const updateMenuWithRecursive = (menus: Menu[], targetmenuNo: string, newMenu: Menu): Menu[] => {
    return menus.map((menu) => {
      if ((menu.menuNo && menu.menuNo === targetmenuNo) || menu.tempmenuNo === targetmenuNo) {
        return { ...newMenu, menuNo: menu.menuNo };
      }
      if (menu.subMenus) {
        return { ...menu, subMenus: updateMenuWithRecursive(menu.subMenus, targetmenuNo, newMenu) };
      }
      return menu;
    });
  };

  const updateMenuItem = (menuNo: string, menu: Menu) => {
    setMenusContextValue(updateMenuWithRecursive(menusContextValue, menuNo, menu));
  };

  const updateMenuOrderWithRecursive = (menus: Menu[], targetMenu: Menu, orderDifference: number): Menu[] => {
    return menus.map((menu) => {
      if (menu.menuNo === targetMenu.parentMenuNo) {
        //유효성 검사 : 서브 메뉴 미존재
        if (!menu.subMenus || menu.subMenus.length === 0) return menu;

        const sourceIndex = menu.subMenus.findIndex((subMenu) => subMenu.menuNo === targetMenu.menuNo);
        const targetIndex = sourceIndex + orderDifference;
        //유효성 검사 : sourceIndex가 -1이면 해당 메뉴가 존재하지 않음
        if (sourceIndex < 0) return menu;
        //유효성 검사 : 최대최소 범위를 벗어남
        if (targetIndex < 0 || targetIndex >= menu.subMenus?.length) return menu;

        //subMenus의 순서를 변경
        const newSubMenus = menu.subMenus?.map((subMenu, index) => {
          if (targetIndex === index) {
            return {
              ...targetMenu,
              sortOrder: String(index),
              action: CrudCode.UPDATE,
            };
          } else if (orderDifference < 0 && targetIndex < index && sourceIndex >= index) {
            //위로 이동
            if (!menu.subMenus) return subMenu;
            return {
              ...menu.subMenus[index - 1],
              sortOrder: String(index),
              action: CrudCode.UPDATE,
            };
          } else if (orderDifference > 0 && targetIndex > index && sourceIndex <= index) {
            //아래로 이동
            if (!menu.subMenus) return subMenu;
            return {
              ...menu.subMenus[index + 1],
              sortOrder: String(index),
              action: CrudCode.UPDATE,
            };
          } else {
            return subMenu;
          }
        });
        return { ...menu, subMenus: newSubMenus };
      }
      if (menu.subMenus) {
        return {
          ...menu,
          subMenus: updateMenuOrderWithRecursive(menu.subMenus, targetMenu, orderDifference),
        };
      }
      return menu;
    });
  };

  const updateMenuOrder = (targetMenu: Menu, orderDifference: number) => {
    setMenusContextValue(updateMenuOrderWithRecursive(menusContextValue, targetMenu, orderDifference));
  };

  useEffect(() => {
    setMenusContextValue(props.data);
  }, [props.data]);

  return (
    <>
      <StyledTree>
        <MenuTreeContext.Provider
          value={{
            menusContextValue,
            updateMenusContextValue,
            insertChildMenuItem,
            updateMenuItem,
            deleteMenuItem,
            updateMenuOrder,
          }}
        >
          <>
            {menusContextValue?.map((menu, index) => {
              return (
                <MenuTreeItem
                  key={index}
                  level={0}
                  menuData={menu}
                  expandLevel={props.expandLevel}
                  hasCheckBox={props.hasCheckBox}
                />
              );
            })}
            {props.children}
          </>
        </MenuTreeContext.Provider>
      </StyledTree>
    </>
  );
};

export default MenuTree;

const StyledTree = styled.span`
  margin: 10px;
`;
