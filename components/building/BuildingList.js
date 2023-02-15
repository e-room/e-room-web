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

export default function BuildingList(props) {
  const { data } = props;

  const [target, setTarget] = useState(null);
  const [state, setState] = useState({
    item: data,
    isLoading: false,
  });

  let cursorId = data[data.length - 1].buildingId;

  const fetchItems = async () => {
    if (!cursorId) return;
    const buildingMarking = localStorage.getItem("buildingMarking");

    const response = await axios.get(
      `/apis/building?buildingIds=${buildingMarking}&size=10&sort=DESC&cursorIds=${cursorId}`,
      {
        headers: {
          mocking: 239,
        },
      }
    );

    const nextItem = response.data.content;
    cursorId = nextItem[nextItem.length - 1]?.buildingId ?? null;

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
    if (target) {
      observer = new IntersectionObserver(
        async ([entry], observer) => {
          if (entry.isIntersecting) {
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
  }, [target]);

  const { item, isLoading } = state;

  return (
    <div>
      {item.map((value) => {
        return (
          <div key={value.buildingId}>
            <Link href={`/building/${value.buildingId}`}>
              <BuildingContainer>
                <Image
                  src={testImg}
                  width={122}
                  height={122}
                  objectFit={"cover"}
                />
                <BuildingContent>
                  <div className="building-name">{value.name}</div>
                  <AddressArea>
                    {value.address.siDo} {value.address.siGunGu}{" "}
                    {value.address.roadName} {value.address.buildingNumber}
                  </AddressArea>
                  <Chips>
                    {value.directDeal && <Chip label={"직거래가능"} />}
                    <Chip label={"교통 편리"} type={"secondary"} />
                  </Chips>
                  <ReviewArea>
                    <div
                      className="review-count"
                      style={{ opacity: 0.5, marginRight: 8 }}
                    >
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
          </div>
        );
      })}
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
