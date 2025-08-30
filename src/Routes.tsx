import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Students from "./pages/pages/Dashboard/Students";
import UserDashboard from "./pages/pages/Dashboard/Dashboard";
import Admins from "./pages/pages/Dashboard/Admins";

const route = [
  {
    path: "/login",
    component: <Login />,
    public: true,
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    public: false,
    children: [
      {
        path: "",
        component: <UserDashboard />,
      },
      {
        path: "cards",
        component: <Students />,
      },
      {
        path: "transactions",
        component: <Admins />,
      },
    ],
  },
];

const Main = () => {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {route.map((data, i) => {
          return (
            <React.Fragment key={i}>
              {data.public ? (
                <Route
                  path={data.path}
                  element={data.component}
                  id={data.path}
                />
              ) : (
                <React.Fragment>
                  {data.path.includes("/dashboard") ? (
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    >
                      {(data.children ?? []).map((route, i) => {
                        const id = String(i + 1);
                        return (
                          <Route
                            key={id}
                            id={id}
                            path={route.path}
                            element={route.component}
                            index={!route.path ? true : false}
                          />
                        );
                      })}
                    </Route>
                  ) : null}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </Route>
    )
  );
  return <RouterProvider router={routes} />;
};

export default Main;
