import { useCallback, useMemo, useState } from "react";
import Icon from "components/common/atoms/Icon";
import SearchList from "components/search/SearchList";
import Nodata from "components/search/Nodata";
import { getSearch } from "services/building.service";

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
    const response = await getSearch({ params: e.target.value });
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
      <div className="fixed z-10 top-0 left-0 w-full h-[44px] bg-white box-border p-[12px] gap-[16px] flex items-center justify-between">
        <div
          onClick={() => setSearchVisible(false)}
          className="flex justify-center items-center min-w-[24px] ml-[4px] cursor-pointer"
        >
          <Icon icon={"arrow-left"} size={"md"} fill="fill-black" />
        </div>
        <input
          placeholder="주소나 건물 이름으로 검색해보세요"
          onKeyUp={onSearchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="w-full h-[24px] border-none placeholder:text-body-2 placeholder:text-gray-3 focus:outline-0"
        />
        {searchValue && (
          <div
            className="rounded-full bg-gray-3 min-w-[16px] min-h-[16px] flex justify-center items-center cursor-pointer"
            onClick={() => setSearchValue("")}
          >
            <Icon icon={"x-icon-xs"} size={"xs"} fill="fill-white" />
          </div>
        )}
      </div>
      <div className="h-[calc(100vh-44px)] bg-body overflow-y-auto overflow-x-hidden mt-[44px]">
        {searchView()}
      </div>
    </>
  );
};
