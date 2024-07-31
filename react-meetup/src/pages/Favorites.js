import { useOutletContext } from "react-router-dom";
import MeetupItem from "../components/meetups/MeetupItem";
import classes from "./../components/meetups/MeetupList.module.css";

export default function FavoritesPage() {
  // Get from context favourites meetups and update a meetup function
  const { favouritesMeetups, updateMeetup } = useOutletContext();

  return (
    <section>
      <h1>Favourites Page</h1>
      {favouritesMeetups && favouritesMeetups.length > 0
        ? <ul className={classes.list}>
          {favouritesMeetups
            .map((item, index) =>
              <MeetupItem key={index} item={item} updateMeetup={updateMeetup} />
            )}
        </ul>
        : <h1>No favourites</h1>}
    </section>
  );
}
