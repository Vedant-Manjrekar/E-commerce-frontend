import React from "react";

import React, { useRef, useState } from "react";

function BannerImage({ image }) {
  return (
    <div className="banner-content border-2 border-violet-500 h-full">
      <img src={image} alt="banner" />
    </div>
  );
}

export default BannerImage;
