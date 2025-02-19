// DashVdoSlider.jsx
import React, { useState, useEffect } from "react";
import dash_vdo_bg1 from './../assets/dash_vdo_img/dash_vdo_bg1.jpg';
const DashVdoSlider = () => {
    // List of local video URLs (relative to the 'public' folder)
    const videos = [
        "/dash_vdos/dash_vdo1.mp4",
        "/dash_vdos/dash_vdo2.mp4",
        "/dash_vdos/dash_vdo3.mp4",
    ];

    // const videos = [
    //     "/dash_vdos2/dash_vdo1.gif",
    //     "/dash_vdos2/dash_vdo2.gif",
    //     "/dash_vdos2/dash_vdo3.gif",
    // ];

    // State to keep track of the current video index
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Change video every 5 seconds (5000 milliseconds)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) =>
                prevIndex === videos.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change video every 5 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [videos.length]);

    return (
        <div className="relative">
  
            <video
                className="w-full h-screen"
                src={videos[currentVideoIndex]}
                autoPlay
                muted
                loop
            />

        </div>


    );
};

export default DashVdoSlider;
