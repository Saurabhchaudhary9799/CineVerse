import Backdrops from '@/components/Backdrops';
import MovieIntro from '@/components/MovieIntro';
import Videos from '@/components/Videos';
import React from 'react'

interface MoviePageProps {
    params: { id: number }; // Access the dynamic id parameter
  }
  

const Page = ({ params }: MoviePageProps) => {
    const { id } = params;
  return (
    <div>
       <MovieIntro movieId={id}/>
     <Videos movieId={id}/>
     <Backdrops movieId={id}/>
    </div>
  )
}

export default Page
