import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";
import {API_URL} from '../../config/index';
import Link from 'next/link';

export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json();

  return {
    props: {events}
  }
}



export default function Events({events}) {
  console.log(events);
  
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

