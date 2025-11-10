import React from "react";
import styled from "styled-components";

const GeneralBtn = ({ children }) => {
  return (
    <StyledWrapper>
      <button className="animated-button">
        <svg
          viewBox="0 0 24 24"
          className="arr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">{children}</span>
        {/* The circle span is no longer needed for this effect */}
        <svg
          viewBox="0 0 24 24"
          className="arr-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px 36px;
    border: none;
    white-space: nowrap;
    font-size: 16px;
    background: linear-gradient(
      90deg,
      var(--color-primary, #d96c4e),
      var(--color-accent, #fbbf24),
      var(--color-primary, #d96c4e)
    );
    background-size: 200% auto;
    background-position: left center;
    border-radius: 100px;
    font-weight: 600;
    color: var(--color-primary-content, #fefbf3);
    cursor: pointer;
    overflow: hidden;
    transition: background-position 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button svg {
    position: absolute;
    width: 24px;
    fill: var(--color-primary-content, #fefbf3);
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .arr-1 {
    right: 16px;
  }

  .animated-button .arr-2 {
    left: -25%;
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    background-position: right center;
    border-radius: 12px;
  }

  .animated-button:hover .arr-1 {
    right: -25%;
  }

  .animated-button:hover .arr-2 {
    left: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(12px);
  }

  .animated-button:active {
    scale: 0.95;
  }
`;

export default GeneralBtn;
