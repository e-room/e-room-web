import styled from "@emotion/styled";
import { useCallback, useMemo, useState } from "react";
import { Body2 } from "styles/typography";
import Icon from "components/common/atoms/Icon";
import axios from "axios";
import SearchList from "components/search/SearchList";
import Nodata from "components/search/Nodata";

export default ({ searchVisible, setSearchVisible }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);

  const debounce = useCallback((func) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, 500);
    };
  }, []);

  const saveInput = async (e) => {
    setSearchList([]);
    const response = await axios.get(
      `/apis/building/search?params=${e.target.value}`
    );
    setSearchList(response.data.content);
  };

  const onSearchValue = useMemo(() => debounce((e) => saveInput(e)), []);

  const searchView = useCallback(() => {
    if (!searchVisible) return;
    if (searchList.length < 1 || !searchValue) {
      return <Nodata />;
    } else {
      return <SearchList data={searchList} searchValue={searchValue} />;
    }
  }, [searchList, searchVisible, searchValue, saveInput]);

  return (
    <>
      <Container>
        <div onClick={() => setSearchVisible(false)} className={"left-icon"}>
          <Icon icon={"arrow-left"} size={"md"} />
        </div>
        <input
          placeholder="주소나 건물 이름으로 검색해보세요"
          onKeyUp={onSearchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        {searchValue && (
          <div
            className={"x-icon cursor-pointer"}
            onClick={() => setSearchValue("")}
          >
            <Icon icon={"x-icon-xs"} size={"xs"} fill={"var(--white)"} />
          </div>
        )}
      </Container>
      <ListContainer>{searchView()}</ListContainer>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  background: var(--white);

  box-sizing: border-box;
  padding: 12px;
  gap: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    height: 24px;
    border: none;

    ::placeholder {
      ${Body2}

      color: var(--gray-3);
    }
    &:focus {
      outline: none;
    }
  }

  .left-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 24px;
    margin-left: 4px;
    cursor: pointer;
  }

  .x-icon {
    border-radius: 100%;
    background: var(--gray-3);
    min-width: 16px;
    min-height: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ListContainer = styled.div`
  height: calc(100vh - 100px);
  background-color: #fafafa !important;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 44px 0;
`;
