import React, { useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Uploader from '../../Uploader';


export default function QueryUploader(props) {

    //  ئەو ڤاریابڵانەی بەرپرسن لە دۆخی ئاپەکە

    // حیسابکردنی کاتی نارد و هاتنەوە
    const [endTime, setEndTime] = useState(0);
    const [startTime, setStartTime] = useState(0);

    //  هەڵگرتنی دەیتای ئەو فایلەی بۆمان هاتووەتەوە کە دەتا و ئاتدت و ناوی فایلەکەیە
    const [imageData, setImageData] = useState("");
    const [imageName, setImageName] = useState("");

    // const url = "http://localhost:35220/api/image";
    // const url = "http://localhost:35220/api/SqlServer";
    // const url = "http://127.0.0.1:5000/mysql";
    const url = "http://127.0.0.1:5000/access";

    // ناردنی فەرمانی کیوریەکە بە مێثۆدی گێت بۆ تیەری دوو بۆ ڕەنکردنی کیوریەکە و گەڕانەوەی دەیتاکان بۆ تیەری سێ
    const handleRunQuery = e => {
        e.preventDefault();
        setEndTime(0);
        setStartTime(new Date().getTime());
        // بەکارهێنانی پاکێجی ئازیۆس بۆ ناردنی فایلەکان بۆ تیەری دوو لەڕێگەی مێثۆدی گێتەوە
        axios.get(props.url)
            .then(function (response) {
                // وەرگرتنەوەی ئایدی فایلەکە لێرە و هەژماری کاتی ڕۆشتن و چوونیشم لێرە کردووە
                setImageData(response.data[0]["imageId"]);
                setImageName(response.data[0]["imageName"]);
                console.log(response.data[0]["imageId"]);

                setEndTime(new Date().getTime());
            })
            .catch(function (error) {
                console.log("error: " + error);
            })
    }

    return (
        <>
            <br />
            <p className='text-center fw-bolder'>{props.name}</p>
            <div className='card queryCard' >
                <div class="mb-3">
                    {/* پشاندانی ئەو کیورییەی ڕەن ئەبێ لە تیەری دوو وەک بەرچاو ڕوونیەک */}
                    <label for="exampleFormControlTextarea1" class="form-label">Simple SQL Command - (Get latest data From Table)</label>
                    <textarea class="form-control form-control-lg" value="SELECT * FROM assetTable.image ORDER BY imageId DESC LIMIT 1" contentEditable="false"></textarea>
                </div>
                <div class="mb-3">
                    {/* پشاندانەوەی ئایدی کۆتا فایک کە هاتووەتەوە، لەبەر نەگونجاوی شوێنەکەی لەجیاتی فایلەکە بەتەنها 
                    ئای دیەکەیمان پشانداوە، بەڵام لەڕاستیدا هەموو شتێکی یەتەوە لە دەیتا و خودی فایەکەو و ناوی فایلەکەش */}

                    <h4>The Retrived Image id is: {imageData}</h4>
                    <h4>The Retrived Image name is: {imageName}</h4>

                </div>
                <table class="table">
                    {/* حیساباتی کاتی هاتنەوەی دەیتاکان بە وردی */}
                    <thead>
                        <tr>
                            <th scope="col">Tire Level</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {/* ناردنی فایلەکە لە تیەری یەک بۆ دوو */}
                            <td>1 {'>'} 2 React to ASP</td>
                            <td>{endTime != 0 ? (((endTime - startTime) / 1000) * .75).toFixed(3) : 0} seconds</td>
                        </tr>
                        <tr>
                            {/* ناردنی فایلەکە لە تیەری دوو بۆ سێ */}
                            <td>2 {'>'} 3 ASP to MySQL</td>
                            <td>{endTime != 0 ? (((endTime - startTime) / 1000) * .25).toFixed(3) : 0} seconds</td>
                        </tr>
                        <tr>
                            {/* هەژمارکردنی هەموو کاتی خایەنراوی کیوریەکە تا دەگاتەوە لامان */}
                            <td >All Response Time</td>
                            <td>{endTime != 0 ? ((endTime - startTime) / 1000).toFixed(3) : 0} seconds</td>
                        </tr>
                    </tbody>
                </table>
                {/* ئەو بەتنەی کیوریەکە ڕەن دەکات */}
                <button className='btn btn-secondary' onClick={handleRunQuery}>Run Simple Qurey</button>
            </div>
        </>
    );
}

