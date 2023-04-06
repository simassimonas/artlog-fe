import axios from 'axios';
import { useContext, useState } from 'react';
import ArtGeneratorInput from '../../components/art-generator/art-generator-input';
import { AuthContext } from '../../context/auth.context';
import './art-to-post.scss';
import { WithContext as ReactTags } from 'react-tag-input';

export interface Tag {
  id: string;
  text: string;
}

const ArtToPost = ({ art, onPost }: any) => {
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);

  const postArt = async () => {
    //e.preventDefault();
    setPrompt('');
    const tagsValues = tags.map((tag) => tag.text);
    onPost(prompt, tagsValues);
  };

  const handleTagAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleTagDelete = (i: Number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const mockImg =
    'https://www.actuia.com/wp-content/uploads/2022/09/oeuvre-art-generee-IA-MidJourney-remporte-1er-prix-Colorado-State-Fair.png';

  return (
    <div className="art-to-post">
      <div className="art-to-post__prompt">
        <span>{art.prompt}</span>
      </div>
      <div className="art-to-post__content">
        <img src={mockImg} alt="post" />
      </div>
      <div className="art-to-post__tags">
        <ReactTags
          tags={tags}
          handleDelete={handleTagDelete}
          handleAddition={handleTagAddition}
          placeholder="Add tags"
          maxLength={Number(process.env.REACT_APP_TAGS_MAX_LENGTH)}
        />
      </div>
      <div className="art-to-post__action">
        <button className="action-button" onClick={onPost}>
          Post as your diary entry
        </button>
      </div>
    </div>
  );
};

export default ArtToPost;
