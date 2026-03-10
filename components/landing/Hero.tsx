import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[700px] flex overflow-hidden bg-black text-white">
            {/* Right Image Background with slanted edge */}
            <div
                className="absolute top-0 right-0 w-[90%] md:w-[65%] h-full z-0"
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
                <Image
                    src="/assets/heroimage.png"
                    alt="Candidate speaking at podium"
                    fill
                    className="object-cover object-[center_30%]"
                    priority
                />
                {/* Subtle dark gradient from bottom for text readability on right side */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Main Content Container */}
            <div className="container relative z-10 w-full h-full mx-auto px-6 md:px-12 lg:px-18 flex flex-col justify-between pt-32 pb-16">

                {/* Top Left Content */}
                <div className="flex flex-col max-w-xl mt-12 md:mt-24">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-300 mb-6 font-semibold">
                        Together Today
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold leading-[1.05] mb-10 text-white">
                        A New <br /> Direction
                    </h1>
                    <div>
                        <button className="bg-[#00d65b] hover:bg-[#00b24c] transition-colors text-white text-xs font-bold uppercase tracking-widest py-4 px-8 flex items-center gap-3 border-none">
                            Join The Movement
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Bottom Scroll Text */}
                <div className="flex items-center gap-3 text-sm text-gray-300 mt-auto">
                    <svg className="w-4 h-4 text-[#00d65b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="font-serif font-medium text-[13px] md:text-sm">Scroll to Website</span>
                </div>
            </div>

            {/* Right Side Overlay Texts - Positioned absolutely to span across the layout accurately */}
            <div className="absolute bottom-16 md:bottom-24 right-6 md:right-16 lg:right-24 z-10 flex flex-col md:flex-row items-end gap-2 md:gap-6 w-full md:w-auto pointer-events-none">
                {/* Title text */}
                <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-bold leading-[1] text-white drop-shadow-2xl text-right md:text-left">
                    Real <br /> Change
                </h2>
                {/* Caption text */}
                <div className="text-right md:text-left text-[10px] md:text-xs text-gray-200 max-w-[200px] md:max-w-[240px] leading-relaxed drop-shadow-md md:mb-3 ml-0 md:ml-4">
                    <span className="font-bold text-white">"ADC"</span> A party on a mission to rescue Nigeria one state at a time
                </div>
            </div>

        </section>
    );
}
