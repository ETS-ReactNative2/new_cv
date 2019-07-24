import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import devices from "../../utils/devices";

const ExperienceStyle = styled.li`
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  transition: height ${props => props.itemTransitionDuration}ms ease-in-out;

  & .item-header {
    height: 50px;
    line-height: 50px;
    cursor: pointer;

    & > i {
      margin: 0 20px;
      transition: transform ${props => props.itemTransitionDuration}ms
        ease-in-out;
    }

    & .item-entreprise {
      font-weight: bold;
    }

    & .item-date {
      font-style: oblique;
      float: right;
      margin-right: 20px;
      padding: 0 5px;
    }
  }

  & .item-content {
    font-size: 0.85em;
    margin-left: 20px;
    padding-bottom: 20px;
    border: 1px solid transparent;

    & .sidenote {
      font-size: 0.8em;
      font-style: italic;
      color: forestgreen;
    }

    & .achievement-style {
      margin-left: 20px;
    }

    & .item-label {
      margin-right: 15px;
      border-bottom: 2px groove black;
    }

    & .item-project {
      color: #2980b9;
    }

    & .item-stack {
      display: flex;
      flex-wrap: wrap;
    }
  }

  @media ${devices.desktop} {
    padding: 20px 0 80px;

    & .item-content {
      padding-bottom: 80px;
    }
  }

  @media ${devices.mobileL} {
    font-size: 0.85em;
  }
`;

const PillStyle = styled.span`
  height: 25px;
  min-width: 70px;
  background-color: cadetblue;
  margin: 0 5px 10px;
  padding: 3px 5px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  text-align: center;
  box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.7);

  @media ${devices.desktop} {
    width: 170px;
    height: 40px;
    border-radius: 15px;
    margin: 25px;
    padding: 10px 15px;
  }

  @media ${devices.mobileL} {
    height: 15px;
    padding: 0 5px;
    border-radius: 4px;
  }
`;

const Experience = ({ item, index, currentIndex, setIndex }) => {
  const itemRef = useRef();
  const itemTitleRef = useRef();
  const itemContentRef = useRef();
  const itemIconArrow = useRef();

  const [itemDiv, setExperienceDiv] = useState({
    id: index,
    isExpanded: false
  });

  const expandDiv = () => {
    if (itemDiv.isExpanded && currentIndex === itemDiv.id) {
      itemRef.current.style.height = `${itemTitleRef.current.getBoundingClientRect()
        .height + itemContentRef.current.getBoundingClientRect().height}px`;
      itemIconArrow.current.style.transform = "rotate(450deg)";
    }
  };

  const reduceDiv = () => {
    if (
      !itemDiv.isExpanded &&
      (currentIndex === -1 || currentIndex !== itemDiv.id)
    ) {
      itemRef.current.style.height = `${
        itemTitleRef.current.getBoundingClientRect().height
      }px`;
      itemIconArrow.current.style.transform = "rotate(0)";
    }
  };

  const handleClick = index => {
    setIndex(currentIndex === index ? -1 : index);
  };

  useEffect(() => {
    setExperienceDiv(prevExperienceDiv => ({
      ...prevExperienceDiv,
      isExpanded:
        currentIndex === -1 || currentIndex !== prevExperienceDiv.id
          ? false
          : true
    }));
  }, [currentIndex]);

  useEffect(() => (itemDiv.isExpanded ? expandDiv() : reduceDiv()), [
    itemDiv.isExpanded
  ]);

  return (
    <ExperienceStyle itemTransitionDuration={600} id={index} ref={itemRef}>
      <div
        onClick={() => handleClick(index)}
        ref={itemTitleRef}
        className="item-header"
      >
        <i ref={itemIconArrow} className="fas fa-caret-right" />
        <span className="item-entreprise">{item.entreprise}</span>
        <span className="item-date">{item.date}</span>
      </div>
      <div ref={itemContentRef} className="item-content">
        <h3>
          <PillStyle>{item.job}</PillStyle>
        </h3>
        <h4>
          <label className="item-label">Project:</label>
          <span className="item-project">{item.project}</span>
        </h4>
        <p>{item.description}</p>
        {item.achievements.length > 0 && (
          <p>
            <strong className="item-label">Achievements:</strong>
            <ul>
              {item.achievements.map(achievement => (
                <li key={achievement}>
                  <i className="fas fa-arrow-right" />
                  <span className="achievement-style">{achievement}</span>
                </li>
              ))}
            </ul>
          </p>
        )}
        {item.stack.length > 0 && (
          <div className="item-stack">
            <strong>
              <label className="item-label">Stack:</label>{" "}
            </strong>
            {item.stack.map(s => (
              <PillStyle key={s}>{s}</PillStyle>
            ))}
          </div>
        )}
        {item.note && <p className="sidenote">{`Note: ${item.note}`}</p>}
      </div>
    </ExperienceStyle>
  );
};

export default Experience;
