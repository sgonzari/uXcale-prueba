import { useOutletContext } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";

export default function NewMeetupsPage() {
  // Get from context create a new meetup function
  const { createMeetup } = useOutletContext();

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm createMeetup={createMeetup} />
    </section>
  );
}
