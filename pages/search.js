import axios from "axios";
import { useRouter } from "next/router";
import AppLayout from "components/common/AppLayout";
import DaumPostCode from "components/common/atoms/DaumPostCode";

export default function search() {
  const router = useRouter();

  const onComplete = (data) => {
    const roadAddressArray = data.roadAddress.split(" ");
    const buildingNumber = roadAddressArray[roadAddressArray.length - 1];
    const params = `${data.roadname} ${buildingNumber}`;
    axios.get(`/apis/building/search?params=${params}`).then((response) => {
      router.push(`/building/${response.data.content[0].buildingId}`);
    });
  };
  return (
    <AppLayout enabledNavbar={false} pageTitle="주소로 검색하기">
      <DaumPostCode onComplete={onComplete} />
    </AppLayout>
  );
}
