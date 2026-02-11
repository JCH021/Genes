import React from 'react';
import Photo from "../Pic/Photo";
import '../ListOfPics/styles.css';

export default function ListOfPics({ pics }) {
  return (
    <div className='ListOfPics'>
      {pics.map(({ id, description, url }) => (
        <div className="ListOfPics-item" key={id}>
          <Photo
            description={description}
            url={url}
            id={id}
          />
        </div>
      ))}
    </div>
  );
}
