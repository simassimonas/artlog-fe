import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import './art-generator-input.scss';

const ArtGeneratorInput = ({
  initialValue = '',
  placeholder,
  onGenerate,
}: any) => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  const generateArt = async () => {
    //e.preventDefault();
    setPrompt('');
    onGenerate(prompt);
  };

  return (
    <div className="art-generator-input">
      <div className="top">
        <div className="left">
          <img src={'/upload/' + user?.profilePic} alt="" />
          <textarea
            cols={6}
            rows={5}
            placeholder={placeholder}
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
          />
        </div>
      </div>
      <hr />
      <div className="bottom">
        <div className="left">
          <div className="tries">Tries: 0 out of 3</div>
        </div>
        <div className="right">
          <button className="action-button" onClick={onGenerate}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtGeneratorInput;
