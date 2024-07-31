import { useEffect } from "react";
import MeetupItem from "../components/meetups/MeetupItem";
import Loader from "../components/ui/Loader";
import classes from "./../components/meetups/MeetupList.module.css";
import { useOutletContext } from "react-router-dom";

export default function AllMeetupsPage() {
  const { data, getMeetups, updateMeetup } = useOutletContext();

  // At the start, get all meetups
  useEffect(() => {
    getMeetups();
  }, []);

  return (
    <section>
      <h1>All Meetups</h1>
      {data
        ? <ul className={classes.list}>
          {data.map((item, index) => <MeetupItem key={index} item={item} updateMeetup={updateMeetup} />)}
        </ul>
        : <Loader />}
    </section>
  );
}
