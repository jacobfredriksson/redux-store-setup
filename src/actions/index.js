import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //Before Refactor
  //   const UserIds = _.uniq(_.map(getState().posts, "userId"));
  //   console.log(UserIds);
  //   UserIds.forEach(id => dispatch(fetchUser(id)));

  //After refactor
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  dispatch({ type: "FETCH_USER", payload: response.data });
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
