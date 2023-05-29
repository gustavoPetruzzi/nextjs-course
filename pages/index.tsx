import Head from 'next/head';

import EventList from "@/components/events/event-list/event-list";
import { EventItem } from "@/dummy-data";
import { getFeaturedEvents } from "@/helpers/api-util";
import { PropsWithChildren } from "react";
import NewsletterRegistration from '@/components/input/newsletter-registration';
interface EventsPageProps {
  featuredEvents: EventItem[]
}
export default function HomePage(props: EventsPageProps) {
  const { featuredEvents } = props;
  return (
    <div>
      <Head>
        <title> Nextjs Events </title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={featuredEvents}/>
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents
    },
    revalidate: 1800
  }
}
