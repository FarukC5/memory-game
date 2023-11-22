import "./SingleCard.css";

export const SingleCard = ({ card, handleChoise, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoise(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />

        <img
          className="back"
          src="/logo512.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};
