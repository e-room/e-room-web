import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const fakeFetch = (delay = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const currentData = [
  "apple",
  "banana",
  "orange",
  "lemon",
  "lime",
  "pure",
  "peach",
  "berry",
];

const nextItem = [
  "dorian",
  "mango",
  "starfruit",
  "dragonFruit",
  "almond",
  "walnut",
  "grape",
  "persimmon",
];

const Home = () => {
  const target = useRef(null);
  const [state, setState] = useState({
    item: [...currentData],
    isLoading: false,
  });
  const fetchItems = async (nextItem) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    await fakeFetch();
    setState((prev) => ({
      item: [...prev.item, ...nextItem],
      isLoading: false,
    }));
  };
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target);
            await fetchItems(nextItem);
            observer.observe(e.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(target.current);
    }
    return () => observer.disconnect();
  }, [target]);

  const { item, isLoading } = state;

  return (
    <div>
      {item.map((fruit, i) => {
        return <ListItem key={i}>{fruit}</ListItem>;
      })}
      <div ref={target}>{isLoading && <Loading>Loading...</Loading>}</div>
    </div>
  );
};

export default Home;

const ListItem = styled.div`
  text-align: center;
  border: 1px solid black;
  height: 200px;
  font-size: 2rem;
  background-color: white;
`;

const Loading = styled.div`
  text-align: center;
  border: 1px solid black;
  height: 200px;
  font-size: 2rem;
  background-color: aliceblue;
`;
