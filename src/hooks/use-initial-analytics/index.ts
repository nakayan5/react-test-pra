import { useEffect } from "react";
import { sendPageview, setStatus } from "../../libs/analytics";

type TUser = {
  id: string;
  role: string;
};

export function useInitialAnalytics(user: TUser) {
  useEffect(() => {
    setStatus(user);
    sendPageview();
  }, [user]);
}
