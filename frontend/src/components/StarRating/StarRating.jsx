import  { useState } from 'react';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          selected={rating >= star}
          onClick={() => handleClick(star)}
        />
      ))}
      {/* <p>Selected rating: {rating}</p> */}
    </div>
  );
};

const Star = ({ selected, onClick }) => (
  <span style={{ cursor: 'pointer' , fontSize:'24px' , color:"red" }} onClick={onClick}>
    {selected ? '★' : '☆'}
  </span>
);

export default StarRating;
