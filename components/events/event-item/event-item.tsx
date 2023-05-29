import { EventItem } from "@/dummy-data";
import Link from "next/link";
import classes from "./event-item.module.css";
import Button from "@/components/ui/button";
import DateIcon from "@/components/icons/date-icon";
import AddressIcon from "@/components/icons/address-icon";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";

interface Iprops {
  event: EventItem;
}

const EventItemComponent: React.FC<Iprops> = (props) => {
  const { title, image, date, location, id } = props.event;
  
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const formattedAddress = location.replace(",", "\n");
  const exploreLink = `/events/${id}`;
  
  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2> {title} </h2>
          <div className={classes.date}>
            <DateIcon />
            <time> {humanReadableDate} </time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address> {formattedAddress} </address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}> 
            <span> Explore Event</span>
            <span className={classes.icon}> <ArrowRightIcon /> </span>
          </Button>
        </div>
      </div>
    </li>
  )
}

export default EventItemComponent;