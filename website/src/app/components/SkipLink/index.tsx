import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

interface Props {
  href: string | null;
  children: ReactNode;
}

const SkipLink = ({ href, children }: Props): JSX.Element => {  
  if (href === null) {
    return <div className={styles.skipLink} />;
  }
  
  return (
    <Link href={href} className={styles.skipLink}>
      {children}
    </Link>
  );
};

export default SkipLink;
