import { EventItem } from "@/dummy-data";
import EventItemComponent from "../event-item/event-item";
import classes from "./event-list.module.css";
interface Iprops {
  events: EventItem[];
}

const EventListComponent: React.FC<Iprops> = (props) => {
  const { events } = props;
  return (
    <ul className={classes.list}>
      {events.map( event => {
        return <EventItemComponent key={event.id} event={event}/>
      })}
    </ul>
  )
}

export default EventListComponent;