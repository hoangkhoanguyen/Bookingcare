import React from 'react';
import '../AboutMe/AboutMe.scss'

export const AboutMe = () => {
    return <div className='home-about-me'>
        <iframe width="50%" height="380px"
            src="https://www.youtube.com/embed/hyzK8oiSTAM"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
        </iframe>
        <div className="details">
            Mình là Hoàng Khoa. Mời bạn nghe những bài hát của mình, nghệ danh của mình là Soobin Hoàng Sơn
        </div>
    </div>;
};
