import { MantineProvider } from "@mantine/core";
import { Notifications, notifications } from "@mantine/notifications";
import { SWRConfig, type SWRConfiguration } from "swr";
import { Route, Switch } from "wouter";

import ErrorPage from "@/routes/ErrorPage";
import Login from "@/routes/Login";
import Recipe from "@/routes/Recipe";
import Register from "@/routes/Register";
import Root from "@/routes/Root";
import Upload from "@/routes/Upload";

const swrOptions: SWRConfiguration = {
  onError: (error) => {
    notifications.show({
      title: "请求时出错",
      message: error.message || "未知错误",
      color: "red",
      position: "top-center",
      autoClose: 5000,
    });
  },
};

export default function App() {
  return (
    <SWRConfig value={swrOptions}>
      <MantineProvider classNamesPrefix="app" defaultColorScheme="auto">
        <Switch>
          <Route path="/" component={Root} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/recipe/new" component={Upload} />
          <Route path="/recipe/:id">
            {(params) => <Recipe id={params.id} />}
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
        <Notifications />
      </MantineProvider>
    </SWRConfig>
  );
}
