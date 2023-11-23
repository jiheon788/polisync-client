export interface IRouterMeta {
  path: string;
  isShow: boolean;
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};

const routerMeta: RouterMetaType = {
  HomePage: {
    path: '/',
    isShow: false,
  },
  MeetingPage: {
    path: '/meeting',
    isShow: false,
  },
};

export default routerMeta;
