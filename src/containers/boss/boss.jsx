import React, { useEffect } from "react";
import { connect } from "react-redux";

import UserList from "../../components/userList/userList";
import { getUserList } from "../../redux/actions";

function Boss(props) {
  useEffect(() => {
    if (!props.userList.length) {
      props.getUserList("jobseeker");
    }
  }, []);

  return <UserList userList={props.userList} />;
}

export default connect((state) => ({ userList: state.userList }), {
  getUserList,
})(Boss);
