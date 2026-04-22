import About from '@/components/landing/About'
import Candidate from '@/components/landing/Candidate'
import Cta from '@/components/landing/Cta'
import Hero from '@/components/landing/Hero'
import Mission from '@/components/landing/Mission'
import News from '@/components/landing/News'
import Support from '@/components/landing/Support'
import Journey from '@/components/landing/Journey'
import Faq from '@/components/landing/Faq'
import Team from '@/components/landing/Team'
// import ComingSoon from '@/components/Comingsoon'


const Home = () => {
  return (
    <main className="min-h-screen bg-black">
      {/* <ComingSoon /> */}
      <Hero />
      <About />
      <Mission />
      <Candidate about={false} />
      <News />
      <Cta />
      <Support />
      <Journey />
      <Team />
      <Faq />
    </main>
  )
}

export default Home
