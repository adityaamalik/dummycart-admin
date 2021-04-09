const routes = [
  {
    path: ["/", "/home"],
    exact: true,
    component: "Home",
  },
  {
    path: ["/products"],
    exact: true,
    component: "Products",
  },
  {
    path: ["/Orders"],
    exact: true,
    component: "Orders",
  },
  {
    path: ["/Categories"],
    exact: true,
    component: "Categories",
  },
  {
    path: ["/product/:id"],
    exact: true,
    component: "Product",
  },
  {
    path: ["/category/:id"],
    exact: true,
    component: "Category",
  },
  {
    path: ["/order/:id"],
    exact: true,
    component: "Order",
  },
  {
    path: ["/blogs"],
    exact: true,
    component: "Blogs",
  },
  {
    path: ["/blog/:id"],
    exact: true,
    component: "Blog",
  },
  {
    path: ["/reviews"],
    exact: true,
    component: "Reviews",
  },
];

export default routes;
