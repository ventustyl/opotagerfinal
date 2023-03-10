import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const Friends = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friend, setFriend] = useState([]);
  const userData = useSelector((state) => state.rootReducer.userReducer);
  const usersData = useSelector((state) => state.rootReducer.usersReducer);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user._id);
        return null;
      });
      array.sort(() => 0.5 - Math.random);
      if (window.innerWidth > 1500) {
        array.length = 5;
      } else if (window.innerWidth > 1300) {
        array.length = 4;
      } else if (window.innerWidth > 1100) {
        array.length = 3;
      } else if (window.innerWidth > 940) {
        array.length = 2;
      } else {
        array.length = 0;
      }
      setFriend(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Amis suggérés</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friend &&
            friend.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img
                        src={
                          window.location.origin +
                          "/image/profil" +
                          usersData[i].picture
                        }
                        alt="user-pic"
                      />
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
              return null;
            })}
        </ul>
      )}
    </div>
  );
};

export default Friends;
