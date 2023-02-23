import Clarifai from "clarifai";
// import apiKey from "../apiKey.js"; // for development 


const app = new Clarifai.App({ apiKey: process.env.API_KEY });
// const app = new Clarifai.App({ apiKey }); // for development 

// example pictures
// https://samples.clarifai.com/face-det.jpg
// https://upload.wikimedia.org/wikipedia/commons/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg
// https://upload.wikimedia.org/wikipedia/commons/6/68/Akha_cropped_hires.JPG

const handleApiCall = (req, res) => {
    app.models
        .predict({
            id: 'face-detection',
            name: 'face-detection',
            version: '6dc7e46bc9124c5c8824be4822abe105',
            type: 'visual-detector',
          },  req.body.linkInput)
        // '53e1df302c079b3db8a0a36033ed2d15' <- alternative model if face_detect_model happens to be down
        .then(data => res.json(data))
        .catch(err => res.status(400).json('error scanning image'));
};

export default handleApiCall;
