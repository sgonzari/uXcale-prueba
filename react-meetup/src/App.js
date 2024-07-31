import { useEffect, useState } from "react";

import AllMeetupsPage from "./pages/AllMeetupsPage";
import FavoritesPage from "./pages/Favorites";
import NewMeetupsPage from "./pages/NewMeetup";
import { ALL_MEETUP_PAGE, FAVORITES_PAGE, NEW_MEETUP_PAGE } from "./utils/constants";

import MainNavigation from "./components/layout/MainNavigation";
import Layout from "./components/layout/Layout";
import { useFetch } from "./util-hooks/useFetch";
import { Outlet } from "react-router-dom";

function App() {
  const [favouritesMeetups, setFavouritesMeetups] = useState([]);
  const { data, getMeetups, createMeetup, updateMeetup } = useFetch({
    url: "/meetups"
  });

  // When data changes, save favourites meetups into state
  useEffect(() => {
    if (data)
      setFavouritesMeetups(data.filter(d => d.favourite));
  }, [data]);

  return (
    <div data-testid="app">
      <MainNavigation favouritesMeetups={favouritesMeetups.length} />
      <Layout>
        <Outlet context={{ data, getMeetups, createMeetup, updateMeetup, favouritesMeetups }} />
      </Layout>
    </div>
  );
}

export default App;
