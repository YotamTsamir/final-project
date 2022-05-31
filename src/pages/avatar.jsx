import { useSelector, useDispatch } from "react-redux";
import { useFormRegister } from "../hooks/useFormRegister";
import { useEffect, useState } from "react";
import { setUserAvatar } from "../store/action/user-action";
export const Avatar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(
        (storeState) => storeState.userModule
      );
      
      const [fileInputState, setFileInputState] = useState('');
      const [previewSource, setPreviewSource] = useState('');
      const [selectedFile, setSelectedFile] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        console.log('submit')
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };
    const uploadImage = async (imageUrl) => {
        const UPLOAD_PRESET = 'uzukqpqj' 
        const CLOUD_NAME = 'ddlztsqql'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData();
        FORM_DATA.append('file', imageUrl)
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)

        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA
            })
            setFileInputState('');
            setPreviewSource('');
            const { url } = await res.json()
            dispatch(setUserAvatar(user, url))
            console.log(user)
        } catch (err) {
            console.error(err);
        }
    };
    

    return <div className="avatar">
        <div className="avatar-header">           
            <img className="avatar-img" src={user.avatar}/> 
            <div className="avatar-fullname">
            {user.fullname} 
            </div>
            <div className="avatar-email">
            {user.email} 
            </div>
        </div>
    

        <input onChange={handleFileInputChange} value={fileInputState} type="file"/>
        <button onClick={handleSubmitFile}>Submit</button>
        {previewSource && (
                <img
                    src={previewSource}
                    className="avatar=upload"
                    style={{ height: '300px' }}
                />
            )}
        </div>
}



















