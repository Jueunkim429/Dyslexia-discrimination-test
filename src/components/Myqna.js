import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import { useHistory} from "react-router-dom";

const Myqna = ({ qnaObj, userObj }) => {
  let history = useHistory();
  const [bucket, setBucket] = useState(false);
  const [myqnas, setMyqnas] = useState([]);

  const onShowdetailClick = () => {
    history.push({
        pathname: `/qna/${qnaObj.id}`,
        replace:false,
        state: { qnaObj: qnaObj }
      });
  };

  return (
    <>
        <div className="myqna_box" onClick={onShowdetailClick} >
            {qnaObj.title}
        </div>
    </>
  );
};

export default Myqna;