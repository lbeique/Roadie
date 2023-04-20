import { useState } from 'react';
import axios from 'axios';

const RatingStars = ({ movieId, userId, currentRating }) => {
  const [hoverValue, setHoverValue] = useState(-1);
  const [rating, setRating] = useState(currentRating);

  const submitRating = async (value, e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(`https://0oeo5enpn6.execute-api.us-west-1.amazonaws.com/movies/${movieId}/ratings`, {
        Rating: value,
        UserId: userId
      });
      setRating(value);
    } catch (err) {
      console.error(err);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
      <span
        key={value}
        className={`text-yellow-400 cursor-pointer ${userId ? '' : 'cursor-not-allowed'} ${value <= (hoverValue || rating) ? 'text-yellow-600' : ''}`}
        onMouseEnter={() => userId && setHoverValue(value)}
        onMouseLeave={() => userId && setHoverValue(-1)}
        onClick={userId ? (e) => submitRating(value, e) : null}
      >
        &#x2605;
      </span>
    ));
  };

  return <div>{renderStars()}</div>;
};

export default RatingStars;