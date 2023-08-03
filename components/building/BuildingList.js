import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

export default function BuildingList(props) {
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
    const buildingMarking = localStorage.getItem("buildingMarking");

    const filterSort = sort ? `${sort},id,DESC` : `DESC`;
    const response = await axios.get(
      `/apis/building?buildingIds=${buildingMarking}&size=10&sort=${filterSort}&cursorIds=${cursorId}`
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
      <div ref={setTarget}>{isLoading && <div>Loading...</div>}</div>
    </div>
  );
}
