import { useRouter } from "next/router";
import AppLayout from "../../components/layout/AppLayout";

export default () => {
  const router = useRouter();

  return <AppLayout>review id : {router.query.id}</AppLayout>;
};
