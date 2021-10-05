import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../elements';
import { storage } from './firebase';

import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
    const dispatch = useDispatch();
    const fileInput = React.useRef();
    const is_uploading = useSelector(state => state.image.uploading);
    const selectFile = (e) => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.files[0]);

        console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        }
    };

    // const uploadFB= () => {
    //     let image = fileInput.current.files[0];
    //     const _upload = storage.ref(`images/${image.name}`).put(image);

    //     _upload.then((snapshot) => {
    //         console.log(snapshot);
    //         snapshot.ref.getDownloadURL().then((url) => {
    //             console.log(url);
    //         })
    //     })
    // }
    const uploadFB = () => {
        // if (!fileInput.current || fileInput.current.files.length === 0) {
        //   window.alert("파일을 선택해주세요!");
        //   return;
        // }
        dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
      };


    return(
        <React.Fragment>
            <input type="file"onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            <Button _onClick={uploadFB}>업로드하기~~</Button>
        </React.Fragment>
    );
};

export default Upload;