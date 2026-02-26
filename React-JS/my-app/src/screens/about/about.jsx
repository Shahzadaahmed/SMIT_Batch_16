// Note: About page...!

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const About = () => {
    const [imagefile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const file = e?.target?.files[0];
        // console.log('Form event: ', file);

        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        };
    };

    const uploadImgToServer = async () => {
        const apiUrl = "http://localhost:5000/api/upload/file";

        try {
            if (!imagefile) {
                console.log('Image is required');
                return
            };
            console.log('Image file: ', imagefile);

            const formData = new FormData();
            formData.append('image', imagefile);
            console.log('Form data: ', formData);

            const res = await axios.post(
                apiUrl,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log('Api res: ' , res);
        }

        catch (error) {
            console.log('Something went wrong while uploading image to server: ', error);
        }
    }

    // useEffect(() => {
    //     preview && console.log(preview);
    // }, [preview]);

    return (
        <div>
            <h1> Image uploading React JS with Node JS </h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
            />

            {
                preview &&
                <img
                    src={preview}
                    alt="File"
                    height={200}
                    width={200}
                />
            }
            <br /> <br /> <br />
            <button onClick={uploadImgToServer}> Upload Image </button>
        </div>
    )
}

export default About;