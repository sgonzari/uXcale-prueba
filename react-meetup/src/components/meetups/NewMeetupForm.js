import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

export default function NewMeetupForm({ createMeetup }) {
  function submitHandler(event) {
    event.preventDefault();

    const { title, image, address, description } = event.target.elements;

    const content = {
      title: title.value,
      image: image.value,
      address: address.value,
      description: description.value
    };

    createMeetup(content);

    event.target.reset();
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" name="title" data-testid="title-input" />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" name="image" data-testid="image-input" />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" name="address" data-testid="address-input" />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" required rows="5" name="description" data-testid="description-input"></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit" data-testid="submit-button">Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
