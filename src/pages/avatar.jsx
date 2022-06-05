import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setUserAvatar } from "../store/action/user-action";
import { updateUserImgInBoards } from "../store/action/board-action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const Avatar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(
        (storeState) => storeState.userModule
    );
    console.log(user)
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileInputState(e.target.value);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            uploadImage(reader.result);
        }
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        }
    };

    // const handleSubmitFile = (e) => {
    //     e.preventDefault();
    //     // console.log('submit')
    //     if (!selectedFile) return;
    //     const reader = new FileReader();
    //     reader.readAsDataURL(selectedFile);
    //     reader.onloadend = () => {
    //         uploadImage(reader.result);
    //     }
    //     reader.onerror = () => {
    //         console.error('AHHHHHHHH!!');
    //     }
    // };


    const uploadImage = async (imageUrl) => {
        const UPLOAD_PRESET = 'uzukqpqj'
        const CLOUD_NAME = 'ddlztsqql'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData();
        FORM_DATA.append('file', imageUrl)
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)
        console.log(UPLOAD_URL)
        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA
            })
            const { url } = await res.json()
            dispatch(setUserAvatar(user, url))
            dispatch(updateUserImgInBoards(user))
            console.log(user)
            setFileInputState('');
        } catch (err) {
            console.error(err);
        }
    };
    console.log(user)

    if (!user) return <h1>Loading...</h1>
    return <div className="avatar">
        <div className="avatar-header">
            {user.avatar &&
                <div className="avatar-img-container">
                    <img className="avatar-img" src={user.avatar} />
                    <label className="costum-input">
                        <div><FontAwesomeIcon className="change-avatar" icon={faEdit} /></div>
                        <input onChange={handleFileInputChange} value={fileInputState} type="file" />
                    </label>
                    {/* <button onClick={handleSubmitFile}>Submit</button> */}
                </div>
            }
            <div className="avatar-fullname">
                {user.fullname}
            </div>
            <div className="avatar-email">
                {user.email}
            </div>
        </div>

    </div>
}

