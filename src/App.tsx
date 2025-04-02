import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import { Route, Switch, useLocation, useSearchParams } from "wouter";

import Category from "@/routes/Category";
import CategoryList from "@/routes/CategoryList";
import Login from "@/routes/Login";
import NotFound from "@/routes/NotFound";
import Recipe from "@/routes/Recipe";
import RecipeEdit from "@/routes/RecipeEdit";
import Register from "@/routes/Register";
import Root from "@/routes/Root";
import Search from "@/routes/Search";
import Upload from "@/routes/Upload";
import UserPage from "@/routes/UserPage";
import UserSettings from "@/routes/UserSettings";

export default function App() {
  const [location] = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (location.startsWith("/search")) {
      document.title = `${query}的搜索结果 - 在线食谱网站`;
    } else {
      document.title = "在线食谱网站";
    }
  }, [location, query]);

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
          <Route path="/user/:id">
            {(params) => (
              <UserPage id={params.id} tabAnchor="created-recipes" />
            )}
          </Route>
          <Route path="/user/:id/:tab">
            {(params) => <UserPage id={params.id} tabAnchor={params.tab} />}
          </Route>
          <Route path="/category/" component={CategoryList} />
          <Route path="/category/:id">
            {(params) => (
              <Category
                id={params.id}
                title={searchParams.get("title") || ""}
              />
            )}
          </Route>
          <Route path="/settings" component={UserSettings} />
          <Route path="/search" component={Search} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
        <Notifications />
      </MantineProvider>
    </SWRConfig>
  );
}
