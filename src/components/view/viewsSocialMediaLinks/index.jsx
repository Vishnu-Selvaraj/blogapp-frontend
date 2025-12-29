import React from "react";
import Image from "next/image";
import fblogo from "../../../../public/assests/images/fb.svg";
import twitterlogo from "../../../../public/assests/images/twitter.svg";
import gmaillogo from "../../../../public/assests/images/gmail.svg";

const SocialMediaLinks = () => {
  return (
    /* Social Media Link Section */

    <div className="my-24 max-w-4xl mx-auto max-[970px]:mx-5">
      <p className="font-semibold my-4">Share this article on social media</p>

      <div className="flex">
        <Image src={fblogo} alt="facebook" className="w-13"></Image>
        <Image src={twitterlogo} alt="twitter" className="w-13"></Image>
        <Image src={gmaillogo} alt="gmail" className="w-13"></Image>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
