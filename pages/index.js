import Layout from "../components/Layout";
import Link from 'next/link';
import EventItem from "../components/EventItem";
import {API_URL} from '../config/index';


export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json();

  return {
    props: {events:events.slice(0,3)}
  }
}


export default function Home({events}) {
  console.log(events);
  
  return (
    <Layout>
      <h1>Up Coming Events</h1>
      {events.length === 0 && <h3>No Events</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

