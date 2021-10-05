import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import { firestore } from "../../shared/firebase";
import moment from "moment";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, (post_list) => ({post_list}));
const addPost = createAction(ADD_POST, (post) => ({post}));

const initialState = {
    list: []
};

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "mean0",
    //     user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg"
    // },
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents="",) => {
    return function (dispatch, getState, {history}){
        const postDB = firestore.collection("post");
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };
        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };

        postDB.add({...user_info, ..._post}).then((doc) => {
            let post = {user_info, ..._post, id:doc.id};
            dispatch(addPost(post));
            history.replace("/");
        }).catch((err) =>{
            console.log("post 작성에 실패했어요! ",err);
        });
    }
}

const getPostFB = () => {
    return function (dispatch, getState, {history}){
        const postDB = firestore.collection("post");
        postDB.get().then((docs) => {
            let post_list = [];
            
            docs.forEach((doc) => {
                // 잘 가져왔나 확인하기! :)
                // 앗! DB에서 가져온 것하고 우리가 Post 컴포넌트에서 쓰는 데이터 모양새가 다르네요!
                // console.log(doc.id, doc.data());
        
                // 데이터 모양을 맞춰주자!
                let _post = doc.data();
                let post = {
                    id: doc.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_profile: _post.user_profile,
                        user_id: _post.user_id,
                    },
                    contents: _post.contents,
                    image_url: _post.image_url,
                    comment_cnt: _post.comment_cnt,
                    imsert_dt: _post.insert_dt
                }
        
                post_list.push(post);
              });
              
            console.log("post_list: ",post_list);
            dispatch(setPost(post_list));
        })
    }
};



export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, (draft) => {
            draft.list = action.payload.post_list;
        }),
        [ADD_POST]: (state, action) => produce(state, (draft) => {
            // 배열 앞에 넣으려고 unshift 쓴다넹.
            draft.list.unshift(action.payload.post);
        })
    }, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
};

export {actionCreators};