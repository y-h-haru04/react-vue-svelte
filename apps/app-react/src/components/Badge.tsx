import { useMemo } from "react";
import { resolveBadge, Status } from "common";

type Props = {
  status: Status;
};

const Badge = ({ status }: Props) => {
  const [className, text] = useMemo<[string, string]>(() => {
    return resolveBadge(status);
  }, [status]);

  return <div className={className}>{text}</div>;
};

export default Badge;
