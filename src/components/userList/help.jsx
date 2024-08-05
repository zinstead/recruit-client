/* {userList.map((user) => (
        <Card
          className="user-card"
          onClick={() => {
            navigate(`/chat/${user._id}`);
          }}
          key={user._id}
          title={
            <img
              // 如果用户没有完善信息,头像就不存在!
              src={
                user.avatar
                  ? require(`../../assets/images/${user.avatar}.png`)
                  : null
              }
              alt=""
            />
          }
          extra={user.username}>
          <div>职位: {user.position}</div>
          {user.usertype === "boss" ? <div>公司: {user.company}</div> : null}
          {user.usertype === "boss" ? <div>月薪: {user.salary}</div> : null}
          <div>描述: {user.info}</div>
        </Card>
      ))} */
