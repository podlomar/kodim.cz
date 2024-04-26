import React from "react"
import 'dayjs/locale/cs';
import styles from "./styles.module.scss";

interface Props {
  lecturerName: string;
  lecturerAvatar: string;
  lecturerLink: string;
  registerUrl: string;
}

const CourseRun = (
  { lecturerName, lecturerAvatar, lecturerLink, registerUrl }: Props
): JSX.Element => {
  return (
    <div className={styles.courseRun}>
      <div className={styles.body}>
        <h3>úterky od 21. května 2024</h3>
        <p>Volná místa k dispozici!</p>
        <div className={styles.lecturer}>
          <img
            className={styles.avatar}
            src={lecturerAvatar}
            alt={lecturerName}
          />
          <a href={lecturerLink}>{lecturerName}</a>
          <span>- Lektor</span>
        </div>
      </div>
      <a
        href={registerUrl}
        className="btn"
      >
        Přihlásit se
      </a>
    </div>
  );
};

export default CourseRun;
