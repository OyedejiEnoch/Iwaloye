import ComingSoon from '@/components/Comingsoon'
// import Footer from '@/components/landing/Footer'
// import Newsletter from '@/components/landing/Newsletter'
// import Navbar from '@/components/Navbar'
// import PageTransition from '@/components/PageTransition'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ComingSoon />
      {/* <PageTransition>
        <Navbar />
        {children}
        <Newsletter />
        <Footer />
      </PageTransition> */}
    </>
  )
}

export default layout
