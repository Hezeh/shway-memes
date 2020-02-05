import React, { Fragment, useState} from 'react';
import Message from './Message';
import Progress from './UploadProgress';
import axios from 'axios'

const MemesUpload = () => {
    const [image, setImage] = useState('');
    const [imagename, setImagename] = useState('Choose File')
    const [uploadedImage, setUploadedImage] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    //const [images, setImages] = useState('')

    const onChange = e => {
        setImage(e.target.files[0]);
        setImagename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            parseInt(
                                Math.round(progressEvent.loaded * 100 / progressEvent.total)
                            )
                        )
                    )
                      // Clear percentage
                      setTimeout(() => setUploadPercentage(0), 1000)
                }
            })
            const { imageName, imagePath} = res.data;
            setUploadedImage( { imageName, imagePath});
            setMessage('File Uploaded')
        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            {message ? <Message msg={message}/> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input 
                      type="file"
                      className="custom-file-input"
                      id="image"
                      accept="image/png, image/jpeg"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor='customFile'>
                        {imagename}
                    </label>
                </div>

                <Progress percentage={uploadPercentage} />

                <input
                  type="submit"
                  value="Upload"
                  className="btn btn-primary btn-block mt-4"
                />
            </form>
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadedImage.imagename}</h3>
                    <img style={{ width: '100%'}} src={uploadedImage.imagePath} alt=''/>
                </div>
            </div>
        </Fragment>
    )
}

export default MemesUpload;