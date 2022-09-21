import { useState } from "react";
import AppLayout from "../components/common/AppLayout";
import Popup from "../components/common/atoms/Popup";

export default function HeartListPage() {
  const [popupVisible, setPopupVisible] = useState(false);
  const onHideClick = () => {
    setPopupVisible(false);
  };

  return (
    <AppLayout appBarObject={{ headerText: "찜한 자취방" }}>
      찜 목록
      <div onClick={() => setPopupVisible(true)}>버튼!!</div>
      {popupVisible && (
        <Popup
          onHideClick={onHideClick}
          title={"제목을 입력해주세요"}
          subTitle={"보조 텍스트를 입력해주세요"}
        />
      )}
    </AppLayout>
  );
}
