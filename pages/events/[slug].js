import React from 'react';
import {FaPencilAlt, FaTimes} from 'react-icons/fa';
import {useRouter} from 'next/router';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout';
import {API_URL} from '../../config/index';
import styles from '../../styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';

// export async function getStaticPaths(){
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()

//   const paths = events.map((evt) => ({
//     params : {slug: evt.slug}
//   }))

//   return {
//     paths,
//     fallback:true
//   }
// }


// export async function getStaticProps({ params: {slug}}){
//   const res = await fetch(`$(API_URL)/events?slug=${slug}`);
//   const events = await res.json();

//   return {
//     props:{
//       evt:events[0],
//     },
//     revalidate:1
//   }
// }


export async function getServerSideProps({query: {slug}}){
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props:{
      evt: events[0],
    }
  }
}


function Event({evt}) {
    const router = useRouter();

    const deleteEvent = async (e) => {
      console.log('delete');
      if(confirm('Are you sure?')){
        const res = await fetch(`${API_URL}/events/${evt.id}`, {
          method: 'DELETE',
        })

        const data = await res.json();
        if(!res.ok){
          toast.error(data.message)
        }else{
          router.push('/events');
        }
      }
    }

  return (
    <Layout>
        {/* <h1>My Event - {evt.name}</h1>
        <p>{router.query.slug}</p> */}
        <div className={styles.event}>
          {/* <div className={styles.controls}>
            <Link href={`/events/edit/${evt.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href="#" className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div> */}

          <span>
            {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
          </span>
          <h1>{evt.name}</h1>
          <ToastContainer />
          {evt.img && (
            <div className={styles.image}>
              <Image src={evt.img} width={960} height={600} />
            </div>
          )}

          <h3>Performers: </h3>
          <p>{evt.performers}</p>
          <h3>Description: </h3>
          <p>{evt.description}</p>
          <h3>Venue:</h3>
          <p>{evt.venue}</p>
          <h3>Address:</h3>
          <p>{evt.address}</p>

          <Link href='/events'>
            <a className={styles.back}>{`<`}Go Back</a>
          </Link>
        </div>
    </Layout>
  )
}

export default Event
