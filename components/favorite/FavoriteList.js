import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "components/building/List";

export default function FavoriteList(props) {
  const { data, sort } = props;

  const [target, setTarget] = useState(null);
  const [state, setState] = useState({
    item: data,
    isLoading: false,
  });
  const lastData = data[data.length - 1];
  let cursorId = sort
    ? (lastData[sort] ?? 0) + "," + lastData.buildingId
    : lastData.buildingId;

  const fetchItems = async () => {
    if (!cursorId) return;

    const filterSort = sort ? `${sort},id,DESC` : `DESC`;
    const response = await axios.get(
      `/apis/member/favorite?size=10&sort=DESC&cursorIds=${cursorId}`
    );

    const nextItem = response.data.content;
    const lastItem = nextItem[nextItem.length - 1];

    cursorId = lastItem
      ? sort
        ? (lastItem[sort] ?? 0) + "," + lastItem.buildingId
        : lastItem.buildingId
      : null;

    if (nextItem.length < 1) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    setState((prev) => ({
      item: [...prev.item, ...nextItem],
      isLoading: false,
    }));
  };
  useEffect(() => {
    let observer;
    if (target && cursorId) {
      observer = new IntersectionObserver(
        async ([entry], observer) => {
          if (entry.isIntersecting && cursorId) {
            observer.unobserve(entry.target);
            await fetchItems();
            observer.observe(entry.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, cursorId]);

  const { item, isLoading } = state;

  return (
    <div>
      <List item={item} />
      <div ref={setTarget}>{isLoading && <Loading>Loading...</Loading>}</div>
    </div>
  );
}

const Loading = styled.div`
  text-align: center;
  border: 1px solid black;
  height: 200px;
  font-size: 2rem;
  background-color: aliceblue;
`;
