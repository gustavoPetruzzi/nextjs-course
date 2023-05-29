import { getAllEvents } from "@/helpers/api-util";
import EventListComponent from "@/components/events/event-list/event-list";
import EventSearch from "@/components/events/event-search/event-search";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { EventItem } from "@/dummy-data";
import Head from "next/head";

interface AllEventsPageProps {
  events: EventItem[];
}

export default function AllEventsPage(props: AllEventsPageProps) {
  const router = useRouter();
  const events = props.events;

  const findEventHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <Head>
        <title>All my events</title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventListComponent events={events}/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 60
  }
}