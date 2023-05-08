import './art.scss';
import { IArt } from '../../../common/interfaces/art.interface';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import ArtToPost from '../art-to-post/art-to-post';

const Art = ({ art }: { art: IArt }) => {
  return (
    <div className="art">
      {/* <div className="art__prompt">
        <span>{art.prompt}ddddddddddd awdaw wad daw d$ dawd awd </span>
      </div> */}
      <div className="art__content">
        <img
          src={`${process.env.REACT_APP_API}/art/images/${art?.name}`}
          alt="art"
        />
      </div>
    </div>
  );
};

export default Art;
