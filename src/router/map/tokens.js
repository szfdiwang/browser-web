const tokensTransferListComponent = () => import("@/views/tokens/tokens-erc20.vue");
const tokensListComponent = () => import("@/views/tokens/tokens-list.vue");
const tokensDetailComponent = () => import("@/views/tokens/tokens-detail.vue");
const emptyComponent = () => import("@/components/common/empty-router.vue");

// export const tokensList = {
//   path: "/tokens",
//   component: import('@/views/tokens/index.vue'),
//   name: "tokens",
//   children: [{
//     path: "/tokens/erc20",
//     component: tokensListComponent,
//     meta: {
//       keepAlive: true // 此组件需要被缓存
//     },
//     name: "erc20"
//   }]
// }


export const tokensList = {
  path: "/tokens",
  component: emptyComponent,
  redirect: '/tokens/erc20',
  meta: {
    keepAlive: true // 此组件需要被缓存
  },
  children: [
    {
      path: 'erc20',
      component: tokensTransferListComponent,
      name: "tokensTransferListComponent"
    },
    {
      path: '/tokens/tokenList',
      component: tokensListComponent,
      name: "tokenList"
    }

  ]

};

export const tokensDetail = {
  path: "/tokens-detail",
  component: tokensDetailComponent,
  name: "tokensDetailComponent"
};
