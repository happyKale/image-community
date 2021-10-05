import React from "react";
import { Grid, Image, Input, Text, Button } from '../elements';

const CommentList = (props) => {

    return(
        <React.Fragment>
            <Grid padding="16px">
                <CommentItem></CommentItem>
                <CommentItem></CommentItem>
                <CommentItem></CommentItem>
                <CommentItem></CommentItem>
                <CommentItem></CommentItem>
            </Grid>
        </React.Fragment>
    );
}

export default CommentList;

const CommentItem = (props) => {
    const {user_profile, user_name, user_id, post_id, insert_dt, contents} = props;
    return(
        <React.Fragment>
            <Grid is_flex>
                <Grid is_flex width="100px">
                    <Image shape="circle"></Image>
                    <Text bold>{user_name}</Text>
                </Grid>
                <Grid is_flex margin="0px 20px">
                    <Text margin="0px">{contents}</Text>
                    <Text margin="0px">{insert_dt}</Text>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "세연",
    user_id: "",
    post_id: 1,
    contents: "방탄소년단 사랑해요~~",
    insert_dt: '2021-10-04 20:00:00'
}