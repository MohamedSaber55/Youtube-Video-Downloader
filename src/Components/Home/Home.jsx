import axios from 'axios';
import React, { useState } from 'react'
import img from './../../downtubelogo.png';

const Home = () => {

    const [videoData, setVideoData] = useState([]);
    const [inputText, setInputText] = useState('');

    async function getContent(url) {
        await axios({
            method: 'post',
            url: 'https://save-from.net/api/convert',
            data: JSON.stringify(url),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function (response) {
            setVideoData(response.data)
        }).catch(function (err) {
            console.log(err);
        })
    }





    console.log(videoData);


    function submitFormData(e) {
        e.preventDefault();
        if (inputText) {
            var url = {
                "url": inputText
            };
            getContent(url)
        }
        else {
            console.log("input is empty");
        }
    }

    function getInputText(e) {
        setInputText(e.target.value);
    }


    return (
        <>
            <div className="container">
                <div className="row py-5 justify-content-center align-items-center align-content-center">
                    <div className="">
                        <h1 className="header text-center fw-semibold text-light"><img style={{ height:"60px"}} src={img} alt="" className="img-fluid mb-2" />Down<span className="text-danger">Tube</span></h1>
                    </div>
                    <p className="m-0 fs-5 text-center text-light">Free Online YouTube Video Downloader</p>
                    <div className="col-md-8">
                        <form onSubmit={submitFormData} className="input-group my-5">
                            <input onChange={getInputText} type="text" placeholder="Enter Video URL" className="form-control" />
                            <button type="submit" className="btn btn-danger px-4">Go</button>
                        </form>
                    </div>
                    {videoData && videoData.meta && videoData.url.length > 0 ? <div className="col-md-12">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={videoData.thumb} alt="thumbnail" className="img-thumbnail img-fluid rounded-3" />
                                </div>
                                <div className="col-md-6 text-light">
                                    <h3 className="my-4 my-md-0">{videoData.meta.title}</h3>
                                    <div className="my-3">
                                        <span className="me-3 fw-bold"> {videoData.meta.duration} M</span>
                                        <span className="fw-bold"> {new Date((videoData.timestamp) * 1000).toDateString()}</span>
                                    </div>
                                    {/* <p>tags : {videoData.meta.tags}</p> */}
                                    <p className="fw-bold fs-5">MP4 : {videoData.url.map((link, i) => {
                                        return (
                                            <span key={i}>
                                                {link.downloadable && link.type === "mp4" ? <>
                                                    <a href={link.url} className="btn btn-danger my-2 me-2 btn-sm ms-1">Download <i className="fa-solid fa-circle-chevron-down"></i></a>
                                                    <span className="mx-2 small">{link.quality} p</span>
                                                </> : ""}
                                            </span>
                                        )
                                    })} </p>
                                </div>
                            </div>
                        </div>
                    </div> : ""}
                </div>
            </div>
        </>
    )
}

export default Home