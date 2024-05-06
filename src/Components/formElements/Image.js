//src/components/formElements/Image.tsx

import React from 'react';

export const Image = ({
  alt,
  nameVal,
  idVal,
  srcVal,
  classNameVal,
  styleVal
}, ref) => {
  // Use the useFormContext hook to access form methods
  return (
    <div className="">
      <img src={srcVal} alt={alt} style={styleVal} className={`card-img-top img-fluid PastShiftImageCss ${classNameVal}`} />
    </div>
  );
};

// const Image = forwardRef(ImageComponent);

// Image.displayName = 'Image'; // Set the display name on the wrapped component

// export default Image ;
