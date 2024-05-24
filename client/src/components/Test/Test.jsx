import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";

const Feedback = (feedback) => {
  const feedbacks = feedback.feedback;
  const colors = {
    orange: "#FFA500",
    grey: "#808080",
  };

  const [result, setResult] = useState();
  useEffect(() => {
    if (feedbacks) {
      var total = 0;
      feedbacks.map((item) => {
        total += item.rating;
      });
      setResult(total / feedbacks.length);
    }
  }, [feedbacks]);

  const totalStart = feedbacks.length;
  const startCounts = [0, 0, 0, 0, 0, 0];
  feedbacks.forEach((item) => {
    startCounts[item.rating]++;
  });

  return (
    <>
      <div className="feedback-overview">
        <div className="overall-rating">
          <span className="rating-value">4.8</span>
          <div className="star-rating">
            <Rating
              initialRating={4.8}
              emptySymbol={<FaStar color={colors.grey} className="icon" />}
              fullSymbol={<FaStar color={colors.orange} className="icon" />}
              readonly
            />
          </div>
          <span className="total-reviews">(37.7k đánh giá)</span>
        </div>
        <div className="filters">
          <button>Tất cả</button>
          <button>5 Sao (37.7k)</button>
          <button>4 Sao (2.7k)</button>
          <button>3 Sao (821)</button>
          <button>2 Sao (222)</button>
          <button>1 Sao (425)</button>
          <button>Có Bình Luận (15.8k)</button>
          <button>Có Hình Ảnh / Video (7.5k)</button>
        </div>
      </div>
      <hr style={{ border: "3px solid #f1f1f1" }} />
      <div className="row-feedback padding-feedback">
        {startCounts.map((count, index) => {
          if (index === 0) return null;
          const percentage = (count / totalStart) * 100;
          return (
            <div key={index} className="star-row">
              <div className="side-feedback">
                <div>{index} Sao</div>
              </div>
              <div className="middle-feedback">
                <div className="bar-container-feedback">
                  <div
                    className={`bar-${index}`}
                    style={{ width: ${percentage}% }}
                  ></div>
                </div>
              </div>
              <div className="side-feedback right-feedback">
                <div>{count}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="individual-reviews">
        {feedbacks.map((item, index) => (
          <div key={index} className="review-item">
            <div className="review-header">
              <span className="username">{item.username}</span>
              <span className="rating-date">
                {item.date} | Phân loại hàng: {item.category}
              </span>
              <Rating
                initialRating={item.rating}
                emptySymbol={<FaStar color={colors.grey} className="icon" />}
                fullSymbol={<FaStar color={colors.orange} className="icon" />}
                readonly
              />
            </div>
            <div className="review-content">
              <p>{item.content}</p>
              <div className="review-images">
                {item.images.map((img, idx) => (
                  <img key={idx} src={img} alt="review" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Feedback;