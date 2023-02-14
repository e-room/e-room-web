import styled from "@emotion/styled";
import Link from "next/link";
import Chip from "components/common/atoms/Chip";
import Score from "components/common/atoms/Score";
import { Body2Bold, Caption2, Caption2Bold } from "styles/typography";
import Image from "next/image";
import testImg from "assets/marker4.png";
import parseFloat from "utils/parseFloat";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
export default function BuildingList({ data }) {
  const currentData = data.content;
  // console.log("currentData", currentData);
  const [cursorId, setCursorId] = useState(
    currentData[currentData.length - 1]?.buildingId
  );
  const [nextItem, setNextItem] = useState([]);
  const target = useRef(null);
  const [state, setState] = useState({
    item: [...currentData],
    isLoading: false,
  });
  console.log("state", state);
  // console.log("nextItem", nextItem);
  const nextFetch = async () => {
    // if (state.item[state.item.length - 1].buildingId === cursorId) return;
    console.log("2");
    const buildingMarking = localStorage.getItem("buildingMarking");
    // console.log("cursorId", cursorId);
    await axios
      .get(
        `/apis/building?buildingIds=${buildingMarking}&size=10&sort=DESC&cursorIds=${cursorId}`,
        {
          headers: {
            mocking: 239,
          },
        }
      )
      .then((res) => {
        if (res?.data?.content && res.data.content.length > 0) {
          setNextItem(res.data.content);
          setCursorId(res.data.content[res.data.content.length - 1].buildingId);
        }
      });
  };

  const fetchItems = async (nextItem) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    await nextFetch();
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
          console.log(e.isIntersecting);
          if (e.isIntersecting) {
            observer.unobserve(e.target);
            console.log("1");
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
  console.log("item", item.length);

  return item.map((value) => {
    return (
      <div>
        <Link href={`/building/${value.buildingId}`} key={value.buildingId}>
          <BuildingContainer>
            <Image src={testImg} width={122} height={122} objectFit={"cover"} />
            <BuildingContent>
              <div className="building-name">{value.name}</div>
              <AddressArea>
                {value.address.siDo} {value.address.siGunGu} {value.address.roadName}{" "}
                {value.address.buildingNumber}
              </AddressArea>
              <Chips>
                {value.directDeal && <Chip label={"직거래가능"} />}
                <Chip label={"교통 편리"} type={"secondary"} />
              </Chips>
              <ReviewArea>
                <div className="review-count" style={{ opacity: 0.5, marginRight: 8 }}>
                  리뷰 {value.reviewCnt}개
                </div>
                <StarArea>{parseFloat(value.avgScore, 1)}</StarArea>
                <div style={{ marginTop: 3 }}>
                  <Score
                    size="sm"
                    readOnly={true}
                    value={value.avgScore}
                    allowFraction={true}
                  />
                </div>
              </ReviewArea>
            </BuildingContent>
          </BuildingContainer>
        </Link>
        <div ref={target}>{isLoading && <Loading>Loading...</Loading>}</div>
      </div>
    );
  });
}

const Loading = styled.div`
  text-align: center;
  border: 1px solid black;
  height: 200px;
  font-size: 2rem;
  background-color: aliceblue;
`;

const BuildingContainer = styled.div`
  display: flex;
  border-top: 1px solid var(--gray-4);

  background: var(--white);
  img {
    background: var(--gray-1);
  }
`;
const BuildingContent = styled.div`
  padding: 12px 20px;
  .building-name {
    ${Body2Bold}

    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const Chips = styled.div`
  display: flex;
  gap: 4px;
  margin: 9px 0;
`;
const ReviewArea = styled.div`
  display: flex;
  align-items: center;
  max-height: 16px;
  .review-count {
    ${Caption2}
  }
`;
const StarArea = styled.div`
  ${Caption2Bold}
  color: var(--primary-1);
`;

const AddressArea = styled.div`
  ${Caption2}
  opacity: 0.5;

  width: calc(100vw - 162px);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
