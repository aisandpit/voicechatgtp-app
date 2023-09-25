import "../App.css";

const ResponseImage = ({ responseURL }) => {
  return (
    <div className="microphone-result-image">
      {responseURL.map((data, index) => (
        <img
          id={`response-${index}`}
          key={index}
          src={data.url}
          alt="assistant response"
        />
      ))}
    </div>
  );
};

export default ResponseImage;
