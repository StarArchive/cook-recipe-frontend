import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SWRConfig } from "swr";
import { Route, Switch } from "wouter";

import Login from "@/routes/Login";
import NotFound from "@/routes/NotFound";
import Recipe from "@/routes/Recipe";
import RecipeEdit from "@/routes/RecipeEdit";
import Register from "@/routes/Register";
import Root from "@/routes/Root";
import Upload from "@/routes/Upload";
import UserPage from "@/routes/UserPage";
import UserSettings from "@/routes/UserSettings";

export default function App() {
  return (
    <SWRConfig>
      <MantineProvider classNamesPrefix="app" defaultColorScheme="auto">
        <Switch>
          <Route path="/" component={Root} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/recipe/new" component={Upload} />
          <Route path="/recipe/:id">
            {(params) => <Recipe id={params.id} />}
          </Route>
          <Route path="/recipe/:id/edit">
            {(params) => <RecipeEdit id={params.id} />}
          </Route>
          <Route path="/space/:id">
            {(params) => <UserPage id={params.id} />}
          </Route>
          <Route path="/settings" component={UserSettings} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Notifications />
      </MantineProvider>
    </SWRConfig>
  );
}
