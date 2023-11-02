import MenuTree from '../components/Tree/MenuTree';
import { Action } from '../models/Action';
import { CrudCode } from '../models/Common.enum';

export interface MenuAction extends Action {
  isChecked?: string;
  isExpand?: string;
  tempMenuId?: string; //신규 메뉴 추가시 식별을 위하여 임시로 부여하는 ID
  //sortOrder: string;
}

export interface Menu extends MenuAction {
  menuId: string;
  menuName: string;
  menuPath: string;
  parentMenuId: string;
  sortOrder?: string;
  subMenus?: Menu[];
  //optional
  level?: number;
}

const mockMenus: Menu[] = [
  {
    //level: 0,
    menuId: '1',
    menuName: '메뉴1',
    menuPath: '/menu1',
    parentMenuId: '0',
    action: CrudCode.READ,
    subMenus: [
      {
        //level: 1,
        menuId: '11',
        menuName: '메뉴1-1',
        menuPath: '/menu1-1',
        parentMenuId: '1',
        action: CrudCode.READ,
        subMenus: [
          {
            //level: 2,
            menuId: '111',
            menuName: '메뉴1-1-1',
            menuPath: '/menu1-1-1',
            parentMenuId: '11',
            action: CrudCode.READ,
          },
        ],
      },
      {
        //level: 1,
        menuId: '12',
        menuName: '메뉴1-2',
        menuPath: '/menu1-2',
        parentMenuId: '1',
        action: CrudCode.READ,
      },
      {
        //level: 1,
        menuId: '13',
        menuName: '메뉴1-3',
        menuPath: '/menu1-3',
        parentMenuId: '1',
        action: CrudCode.READ,
      },
      {
        //level: 1,
        menuId: '14',
        menuName: '메뉴1-4',
        menuPath: '/menu1-4',
        parentMenuId: '1',
        action: CrudCode.READ,
      },
    ],
  },
  {
    //level: 0,
    menuId: '2',
    menuName: '메뉴2',
    menuPath: '/menu2',
    parentMenuId: '0',
    action: CrudCode.READ,
    subMenus: [
      {
        //level: 1,
        menuId: '21',
        menuName: '메뉴2-1',
        menuPath: '/menu2-1',
        parentMenuId: '2',
        action: CrudCode.READ,
      },
      {
        //level: 1,
        menuId: '22',
        menuName: '메뉴2-2',
        menuPath: '/menu2-2',
        parentMenuId: '2',
        action: CrudCode.READ,
      },
    ],
  },
];

// TODO : parentMenuId를 이용해서 Tree 구조로 만들기

const MenuManagementPage = () => {
  return (
    <div>
      <MenuTree data={mockMenus} expandLevel={2} hasCheckBox={true} />
    </div>
  );
};

export default MenuManagementPage;
