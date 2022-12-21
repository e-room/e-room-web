import styled from "@emotion/styled";
import Toggle from "components/common/atoms/Toggle";

export default function RoomSelector({ data }) {
  return (
    <Box>
      {data.map((value) => {
        return (
          <Toggle className="toggle" label={`${value.roomNumber}호`} key={value.roomId} />
        );
      })}
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  margin: 12px 20px;
  gap: 4px;
  overflow-x: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }

  .toggle {
    white-space: nowrap;
  }
`;
