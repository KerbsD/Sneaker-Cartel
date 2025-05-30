import { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

function Carousel() {
    const slides = [
        {
            url: 'https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/461436207_8305956079473388_8238303615929341569_n.jpg',
        },
        {
            url: 'https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/480816421_626875920077122_1980535158745854978_n.jpg',
        },
        {
            url: 'https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/481237866_626879236743457_2993748852875200494_n.jpg',
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto px-4 absolute top-0 group z-0 md:left-0 md:px-0'>
            <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className='w-full h-screen absolute left-0 bg-center bg-cover duration-500 -z-10 md:w-[99vw] md:left-0'
            >
                <div className='flex absolute bottom-1 inset-x-0 justify-center z-20'>
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}    
                            onClick={() => goToSlide(slideIndex)}
                            className='text-2xl cursor-pointer'
                        >
                            <RxDotFilled />
                        </div>
                    ))}
                </div>
            </div>

            <div className='group-hover:block absolute top-[50%] md:top-[60%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

            <div className='group-hover:block absolute top-[50%] md:top-[60%] -translate-x-0 md:translate-x-[24vw] translate-y-[-50%] right-5 text-2xl rounded-full p-2 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
        </div>
    );
}

export default Carousel;