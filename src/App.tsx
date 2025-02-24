import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";

import RootLayout from "@/layouts/RootLayout";
import ErrorPage from "@/routes/ErrorPage";
import Login from "@/routes/Login";
import Recipe from "@/routes/Recipe";
import Register from "@/routes/Register";
import Root from "@/routes/Root";
import Upload from "@/routes/Upload";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider classNamesPrefix="app" defaultColorScheme="auto">
        <Switch>
          <Route path="/" component={Root} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/recipe/new" component={Upload} />
          <Route path="/recipe/:id">
            {(params) => (
              <RootLayout>
                <Recipe id={params.id} />
              </RootLayout>
            )}
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  );
}
