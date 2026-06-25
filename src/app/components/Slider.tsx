"use client"
import { SwiperSlide , Swiper } from "swiper/react"
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../globals.css';
import { EffectFade ,Autoplay , Pagination } from "swiper/modules";
 
function Slider() {
 const result = "https://res.cloudinary.com/dfsrso3jk/video/upload/q_auto,f_auto/v1779494778/Taking_notes_gbig1p.mp4"
 const classroom = "https://res.cloudinary.com/dfsrso3jk/video/upload/q_auto,f_auto/v1779494778/Kids_Studying_from_Home_f4x9vo.mp4"
 const analysis = "https://res.cloudinary.com/dfsrso3jk/video/upload/q_auto,f_auto/v1779494779/Mathematics_c2pc1k.mp4"
 const practice = "https://res.cloudinary.com/dfsrso3jk/video/upload/q_auto,f_auto/v1779494778/Webinar_erm91p.mp4"        
  return (
     <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
        loop={true}
        navigation={true}
       /*  pagination={{
          clickable: true,
        }}  */
        modules={[EffectFade, Autoplay, Pagination]}
        className="mySwiper"
      >
  <SwiperSlide>
  <div className="relative w-full md:w-4/5 md:mt-5">

    <video
      autoPlay
      muted
      playsInline
      src={classroom}
      className="h-full w-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20 rounded-sm" />

    {/* Text Content */}
    <div className="absolute bottom-6 left-6 z-10 max-w-sm">

      <h2 className="text-2xl font-bold text-black">
        Interactive Learning
      </h2>

      <p className="mt-2 text-sm text-black/80">
        Study smarter with engaging lessons and guided classroom experiences.
      </p>
    </div>

  </div>
</SwiperSlide>

  <SwiperSlide>
  <div className="relative w-full md:w-4/5 mt-5">

    <video
      autoPlay
      muted
      playsInline
      src={result}
      className="h-full w-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20 rounded-sm" />

    {/* Text Content */}
    <div className="absolute bottom-6 left-6 z-10 max-w-sm">

      <h2 className="text-2xl font-bold text-black">
        See your results at an Instant
      </h2>

      <p className="mt-2 text-sm text-black/80">
        Get updates on your result as soon as tests are concluded
      </p>

      
    </div>

  </div>
</SwiperSlide>

  <SwiperSlide>
  <div className="relative w-full md:w-4/5 mt-5">

    <video
      autoPlay
      muted
      playsInline
      src={analysis}
      className="h-full w-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20 rounded-sm" />

    {/* Text Content */}
    <div className="absolute bottom-6 left-6 z-10 max-w-sm">

      <h2 className="text-2xl font-bold text-black">
        Analyize your Past Performances 
      </h2>

      <p className="mt-2 text-sm text-black/80">
        Evaluate your performance and see areas to improve on
      </p>
    </div>

  </div>
</SwiperSlide>
  <SwiperSlide>
  <div className="relative w-full md:w-4/5 mt-5">

    <video
      autoPlay
      muted
      playsInline
      src={practice}
      className="h-full w-full object-cover"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20 rounded-sm" />

    {/* Text Content */}
    <div className="absolute bottom-6 left-6 z-10 max-w-sm">

      <h2 className="text-2xl font-bold text-black">
        Test Your self with past questions 
      </h2>

      <p className="mt-2 text-sm text-black/80">
        Get Exam Ready with our well worked samples of past questions
      </p>

    </div>

  </div>
</SwiperSlide>
      </Swiper>
    </>
  )
}
export default Slider