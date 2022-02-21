import Layout from "../../components/Layout";
import EventItem from "../../components/EventItem";
import {API_URL} from '../../config/index';
import Link from 'next/link';
import qs from 'qs';

export async function getServerSideProps({query:{term}}){

  const query = qs.stringify({
      _where:{
          _or:[
              {name_contains: term},
              {performers_contains: term},
              {description_contains: term},
              {address_contains: term}
          ]
      }
  })
  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: {events}
  }
}



export default function Search({events}) {
  console.log(events);
  
  return (
    <Layout>
      <Link href='/events'>
        <a>{`< `}Go Back</a>
      </Link>
      <h1>Search Events Results</h1>
      {events.length === 0 && <h3>No Events</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

