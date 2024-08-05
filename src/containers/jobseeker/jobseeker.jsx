import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getUserList } from "../../redux/actions";
import UserList from "../../components/userList/userList";

function Jobseeker(props) {
  useEffect(() => {
    if (!props.userList.length) {
      props.getUserList("boss");
    }
  }, []);

  return <UserList userList={props.userList} />;
}

export default connect((state) => ({ userList: state.userList }), {
  getUserList,
})(Jobseeker);
