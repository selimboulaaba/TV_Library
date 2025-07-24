import "../assets/css/Loading.css";

function Loading({ min_h }) {
  return (
    <div className={`flex justify-center items-center w-full h-full min-h-[${min_h}vh]`}>
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
        <div className="bar7"></div>
        <div className="bar8"></div>
        <div className="bar9"></div>
      </div>
    </div>
  );
}

export default Loading;
