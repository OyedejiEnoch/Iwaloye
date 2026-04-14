import Image from "next/image";
import { FileText } from "lucide-react";
import Candidate from "@/components/landing/Candidate";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-black/20">
                    <Image
                        src="/assets/iwaloye3.png"
                        alt="Dr. Salaam"
                        fill
                        className="object-cover object-center mix-blend-overlay"
                        priority
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div> */}
                </div>

                {/* Hero Text */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full mt-20">
                    <div className="max-w-2xl">
                        <p className="text-lg md:text-xl font-medium text-[#8BC34A] mb-2 font-poppins">
                            The Resilient Trailblazer
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-8 tracking-wide drop-shadow-lg">
                            MEET ÌWÀLÓYÈ
                        </h1>
                        <button className="bg-white text-black font-semibold py-4 px-6 flex items-center gap-2 hover:bg-gray-100 transition-colors text-sm">
                            Download Manifesto <FileText className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                </div>
            </section>

            <Candidate heading="ÌWÀLÓYÈ" subHeading="“A Legacy of Leadership, Scholarship, and Service.”" className="text-center" />

            {/* Body Content */}
            <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-24">

                {/* Early Life and Education */}
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="w-2 h-2 bg-[#ff8a00] rounded-sm"></span>
                        <h2 className="text-2xl md:text-3xl font-bold font-sans text-gray-900">
                            Early Life and Education
                        </h2>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base text-left md:text-center mb-16 px-4 md:px-0 font-light">
                        Despite facing the profound loss of his parents at a tender age, Dr. Salaam demonstrated an extraordinary resilience and an unwavering commitment to education that would define the course of his life. His academic journey began at Ansar-U-Deen Primary School in Ejigbo and continued through Baptist School in Ola, culminating at Baptist High School in Ejigbo, where his exceptional dedication to learning began to shine. Driven by an insatiable curiosity and an unrelenting thirst for knowledge,
                        he pursued higher education at the prestigious Obafemi Awolowo University in Ile-Ife, earning a Bachelor of Science degree in Political Science in 1993. Not one to rest on his laurels, Dr. Salaam continued to expand his intellectual horizons, obtaining
                        a Master&apos;s degree in 2013, and further pushing the boundaries of his expertise, he achieved the ultimate academic distinction by completing a Doctor of Philosophy (Ph.D.) in Political Science in 2018. His journey is a testament not only to his remarkable perseverance and intellectual rigor but also to the power of determination and vision in overcoming adversity and reaching the pinnacle of scholarly achievement, inspiring countless others to pursue excellence against all odds.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Degree Cards */}
                        <div className="border-t border-r border-l border-green-200 p-8 flex flex-col items-center justify-center gap-3 min-h-[140px] hover:shadow-md transition-shadow">
                            <h3 className="text-green-500 text-xs font-semibold uppercase tracking-wider">Bachelor's Degree</h3>
                            <p className="text-gray-800 font-medium text-sm">B.Sc. Political Science</p>
                            <span className="text-gray-400 text-xs font-medium mt-1">1993</span>
                        </div>
                        <div className="border-t border-r border-l border-green-200 p-8 flex flex-col items-center justify-center gap-3 min-h-[140px] hover:shadow-md transition-shadow">
                            <h3 className="text-green-500 text-xs font-semibold uppercase tracking-wider">Master's Degree</h3>
                            <p className="text-gray-800 font-medium text-sm">M.Sc. Political Science</p>
                            <span className="text-gray-400 text-xs font-medium mt-1">2013</span>
                        </div>
                        <div className="border-t border-r border-l border-green-200 p-8 flex flex-col items-center justify-center gap-3 min-h-[140px] hover:shadow-md transition-shadow">
                            <h3 className="text-green-500 text-xs font-semibold uppercase tracking-wider">Doctorate</h3>
                            <p className="text-gray-800 font-medium text-sm">Ph.D. Political Science</p>
                            <span className="text-gray-400 text-xs font-medium mt-1">2018</span>
                        </div>
                    </div>
                </div>

                {/* A Defining Era in Public Service */}
                <div className="text-center pt-8">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="w-2 h-2 bg-[#ff8a00] rounded-sm"></span>
                        <h2 className="text-2xl md:text-3xl font-bold font-sans text-gray-900">
                            A Defining Era in Public Service
                        </h2>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base text-left md:text-center mb-16 px-4 md:px-0 font-light">
                        In 2007, Dr. Salaam was elected to the Osun State House of Assembly, a remarkable milestone that was temporarily interrupted by an annulment of his election in 2009. Undeterred, he reclaimed his mandate in the 2011 elections and was elected Speaker of the Assembly on June 2, 2011. During his eight-year tenure, he presided over a transformative legislative reforms, addressing critical issues such as public health, urban development, and security. Under his leadership the Assembly achieved legislative harmony and effectiveness, solidifying his reputation as a unifying and visionary leader.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 max-w-4xl mx-auto px-4 md:px-0 text-left">
                        {/* Stat 1 */}
                        <div className="flex flex-col items-start md:items-center md:gap-4 lg:gap-6">
                            <div className="flex items-center gap-2 mb-2 md:mb-0">
                                <span className="text-7xl md:text-[110px] font-bold font-sans text-gray-900 leading-none">20</span>
                                <div className="flex flex-col">
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 leading-none">Years</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 leading-none mt-1">Experience</span>
                                </div>
                            </div>
                            <p className="text-xs text-black/80 underline decoration-gray-400 underline-offset-4 mt-2 md:mt-0 font-medium max-w-[200px] leading-relaxed">
                                A proven record of leadership, legislative excellence, and public trust
                            </p>
                        </div>

                        <div className="space-y-10">
                            {/* Stat 2 */}
                            <div className="flex flex-col items-start pt-2 md:pt-4">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-[60px] font-bold font-sans text-gray-900 leading-none">8</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 pb-1">Years</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 font-medium">As Speaker of Osun State House of Assembly</p>
                            </div>

                            {/* Stat 3 */}
                            <div className="flex flex-col items-start">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-[60px] font-bold font-sans text-gray-900 leading-none">2</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 pb-1">Elections Won</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 font-medium max-w-[300px]">2 Elections Won &ndash; 2007 &amp; 2011 (comeback story adds weight)</p>
                            </div>

                            {/* Stat 4 */}
                            <div className="flex flex-col items-start">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-5xl md:text-[60px] font-bold font-sans text-gray-900 leading-none">5</span>
                                    <span className="text-xl md:text-3xl font-bold font-sans text-gray-900 pb-1">Key Reform Areas</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 font-medium">Health, Urban Development, Security</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Driven by Determination... */}
                <div className="text-center pt-12 pb-16">
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <span className="w-2 h-2 bg-[#ff8a00] rounded-sm"></span>
                        <h2 className="text-2xl md:text-3xl font-bold font-gentium text-gray-900">
                            Driven by Determination, Defined by Achievement
                        </h2>
                    </div>
                    <p className="text-[#364153] leading-loose text-sm md:text-base text-left md:text-center px-4 md:px-0 font-light">
                        Dr. Salaam&apos;s influence extends far beyond the realm of politics, marking him as a prolific thinker, writer, and leader whose impact resonates across multiple domains. In 2019, he co-authored the widely recognized textbook Rudiments of Government and Politics, earning respect in both academic and professional circles for his intellectual contributions. His dedication to service has been celebrated through numerous honors, including his induction as Patron of the Sports Writers Association of Nigeria (SWAN), Osun State Chapter, and his recognition as Asiwaju Adinni and Olu Omo of Ejigboland, reflecting both his faith and commitment to community leadership. Following his tenure as Speaker, Dr. Salaam assumed a pivotal role as Executive Director of Marketing and Business Development at Nigeria Communications Satellite Limited (NigComSat), continuing to shape Nigeria&apos;s telecommunications landscape. From an orphaned child in Ejigbo to a trailblazer in politics and academia, his life story is a testament to resilience, determination, and faith, inspiring audiences worldwide through his insights, engagement, and leadership. He is happily married with children, continuing to serve as a beacon of hope and a model of excellence for generations to come.
                    </p>
                </div>

            </section>
        </div>
    );
} 