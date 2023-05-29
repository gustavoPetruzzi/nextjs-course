import EventListComponent from "@/components/events/event-list/event-list";
import { EventItem, getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import ResultsTitle from "@/components/events/results-title/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert/error-alert";
import { GetServerSideProps } from "next";


interface FilteredPageProps {
  hasError: boolean;
  events?: EventItem[];
  year: number;
  month: number;
}
export default function FilteredEventsPage (props: FilteredPageProps) {
  const router = useRouter();
  const { hasError, events, year, month } = props;
  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading... </p>;
  }

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p> Invalid filter. Please adjust your values! </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events </Button>
        </div>
      </>
    )
  }

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p> No events found for the chosen filter! </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events </Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);



  return (
    <>
      <ResultsTitle date={date} ></ResultsTitle>
      <EventListComponent events={events} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const filterData = params!.slug;

  const filteredYear = filterData![0];
  const filteredMonth = filterData![1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
        events: []
      }
    };
  };

  const filteredEvents = await getFilteredEvents({year: numYear, month: numMonth});



  return {
    props: {
      hasError: false,
      events: filteredEvents,
      year: numYear,
      month: numMonth
    }
  }
}