import React from 'react';
import {Uploader, Message, Loader, useToaster} from 'rsuite';
import ImageIcon from '@rsuite/icons/Image';
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {useAuth} from "@/contexts/AuthContext";

const storage = getStorage();

const IconUploader = ({setIconURL}) => {
    const toaster = useToaster();
    const {currentUser} = useAuth();
    const [uploading, setUploading] = React.useState(false);
    const [fileInfo, setFileInfo] = React.useState<string | null>(null);

    return (
        <Uploader
            fileListVisible={false}
            listType="picture"
            action="#"
            onUpload={file => {
                setUploading(true);

                const storageRef = ref(storage, currentUser.email + '/icons/' + file?.blobFile?.name);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const uploadTask = uploadBytesResumable(storageRef, file.blobFile!, {contentType: 'image/jpeg'});

                uploadTask.on('state_changed',
                    snapshot => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    error => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                toaster.push(<Message type="error">User does not have permission to access the
                                    object</Message>);
                                break;
                            case 'storage/canceled':
                                toaster.push(<Message type="error">User canceled the upload</Message>);
                                break;
                            case 'storage/unknown':
                                toaster.push(<Message type="error">Unknown error occurred</Message>);
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                            console.log('File available at', downloadURL);
                            setUploading(false);
                            toaster.push(<Message type="success">Uploaded successfully</Message>);
                            setFileInfo(downloadURL);
                            setIconURL(downloadURL);
                        });
                    }
                );
            }}
        >
            <button style={{width: 80, height: 80}}>
                {uploading && <Loader backdrop center/>}
                {fileInfo ? (
                    <img src={fileInfo} width="100%" height="100%" alt="icon"/>
                ) : (
                    <ImageIcon style={{fontSize: 24}}/>
                )}
            </button>
        </Uploader>
    );
};

export default IconUploader;