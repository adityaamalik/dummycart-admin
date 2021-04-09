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
    path: ["/product"],
    exact: true,
    component: "Product",
  },
  {
    path: ["/category"],
    exact: true,
    component: "Category",
  },
  {
    path: ["/order"],
    exact: true,
    component: "Order",
  },
  {
    path: ["/blogs"],
    exact: true,
    component: "Blogs",
  },
  {
    path: ["/blog"],
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
