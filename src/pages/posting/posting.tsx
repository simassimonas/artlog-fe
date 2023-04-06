import axios from 'axios';
import { useContext, useState } from 'react';
import { IArt } from '../../common/interfaces/art.interface';
import ArtGeneratorInput from '../../components/art-generator/art-generator-input';
import ArtToPost from '../../components/art-to-post/art-to-post';
import { AuthContext } from '../../context/auth.context';
import './posting.scss';

const Posting = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const generateArt = async () => {
    //e.preventDefault();
    setPrompt('');
  };

  const mockArt: IArt[] = [
    {
      userId: '123',
      name: '333',
      _id: '123214',
      prompt: 'dawdaw bt flowers river beautiful chery lala -v4 prompt',
      createdAt: '2020',
    },
    {
      userId: '123',
      name: '333',
      _id: '123214',
      prompt: 'dawdaw bt flowers river beautiful chery lala -v4 prompt',
      createdAt: '2020',
    },
    {
      userId: '123',
      name: '333',
      _id: '123214',
      prompt: 'dawdaw bt flowers river beautiful chery lala -v4 prompt',
      createdAt: '2020',
    },
  ];

  return (
    <div className="posting">
      <ArtGeneratorInput placeholder="Enter a prompt describing your day" />
      <div className="posting__art">
        {mockArt.map((art) => (
          <ArtToPost art={art}></ArtToPost>
        ))}
      </div>
    </div>
  );
};

export default Posting;
