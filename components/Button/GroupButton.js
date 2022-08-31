import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Icon from "../Icon";

const StyledGroupButton = styled.button`
  box-sizing: border-box;
  cursor: pointer;

  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.8);

  border: none;
  border-top: 1px solid var(--gray-4);

  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(24px);

  svg {
    fill: var(--black);
  }
`;

const GroupWrapper = styled.div`
  button:first-of-type {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  button:last-of-type {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

export default function GroupButton({ items }) {
  // items = [
  //   { icon: "plus", onClick: zoomIn },
  //   { icon: "minus", onClick: zoomOut },
  // ]
  return (
    <GroupWrapper>
      {items.map((value) => {
        return (
          <StyledGroupButton onClick={value.onClick} key={value.icon}>
            <Icon icon={value.icon} size="md" />
          </StyledGroupButton>
        );
      })}
    </GroupWrapper>
  );
}

GroupButton.propTypes = {
  items: PropTypes.array,
};
