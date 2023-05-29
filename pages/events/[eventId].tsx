import { useRouter } from "next/router"
import { useEffect } from "react";
import EventSummary from "@/components/events/event-detail/event-summary";
import EventLogistics from "@/components/events/event-detail/event-logistics";
import EventContent from "@/components/events/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import Comments from '../../components/input/comments';
import { GetStaticProps } from "next";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { EventItem } from "@/dummy-data";
import Head from "next/head";

interface EventDetailPageProps {
  selectedEvent: EventItem;
}

export default function EventDetailPage(props: EventDetailPageProps) {
  const event = props.selectedEvent;

  if (!event) {
    return
      <div className="center"> 
        <p> Loading... </p>
      </div>
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics 
        date={event.date}
        address={event.location}
        image={event.image}
        alt={event.title}
      />
      <EventContent>
        <p> {event.description} </p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params?.eventId;
  const event = await getEventById(eventId as string);
  
  return {
    props: {
      selectedEvent: event
    },
    revalidate: 30
  }
}


export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventId: event.id }}));

  return {
    paths,
    fallback: 'blocking'
  }
}
