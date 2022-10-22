import { Box, Button, Card, Container, OutlinedInput, Typography} from '@mui/material';
import React from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from 'react';
import  app  from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


// Option select mui imports
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../requestMethods';

function UploadVideoContent() {

    // Get Input Values
    const [inputs, setInputs] = useState('');
    const [video, setVideo] = useState('');
    const [imgPerc, setImgPerc] = useState(0);
    const [videoPerc, setVideoPerc] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

    const handleCategory = (event) => {
        setCategory(event.target.value);
    };

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        
    

        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            urlType === "imageUrl" ? setImgPerc(Math.ceil(progress)) : setVideoPerc(Math.round(progress));
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                break;
                default:
            }
        }, 
        (error) => {}, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev) => {
                    return {...prev, [urlType]: downloadURL};
                })
            });
        }
    );
    }


    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        image && uploadFile(image, "imageUrl");
    }, [image]);


    
    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await userRequest.post('/video', {title:inputs.title, desc:inputs.desc, category:category, imgUrl:inputs.imageUrl, videoUrl:inputs.videoUrl});
        res.status === 200 && navigate(`/watch/${res.data._id}`)
    }
    




  return (
    <Container>
        <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            <Card elevation={3} sx={{ width:{md:'60%', sm:'100%', xs:'100%'}, p:2, my:3, backgroundColor:'#333333' }}>
                <Box sx={{ my:4 }}>
                    <Typography fontWeight='fontWeightMedium' sx={{ fontSize:'25px' }} color='secondary' align='center'>
                        Upload Video
                    </Typography>
                </Box>

                <Box sx={{ my:4, display:'flex', justifyContent:'center' }}>
                    <OutlinedInput name='title' required placeholder="Title (Required*)" sx={{ color:'gray', border:'.5px solid gray', width:'80%', height:'auto', py:0 }} onChange={handleChange}/>
                </Box>

                <Box sx={{ display:'flex', justifyContent:'center' }}>
                    <OutlinedInput name='desc' multiline required placeholder="Desc (Required*)" sx={{ color:'gray', border:'.5px solid gray', width:'80%', height:'auto', py:2 }} onChange={handleChange}/>
                </Box>

                <Box sx={{ width:'100%', display:'flex', justifyContent:'center', alignItems:'center', mt:4 }}>
                    <Box sx={{ width:'80%' }}>
                        <FormControl fullWidth sx={{ color:'#f2f2f2', border:'1px solid gray' }}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                            name='category'
                            value={category}
                            label="Category"
                            onChange={handleCategory}
                            >
                            <MenuItem value='Entertainment'>Entertainment</MenuItem>
                            <MenuItem value='Sports'>Sports</MenuItem>
                            <MenuItem value='Health'>Health</MenuItem>
                            <MenuItem value='Business'>Business</MenuItem>
                            <MenuItem value='News'>News</MenuItem>
                            <MenuItem value='Education'>Education</MenuItem>
                            <MenuItem value='Music'>Music</MenuItem>
                            <MenuItem value='Religion'>Religion</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Box sx={{ display:'flex', justifyContent:'center' }}>
                    <Box sx={{ display:{md:'flex', sm:'flex', xs:'block'}, mb:3, pl:{md:3, sm:10, xs:12}}}>
                        <Box>
                            <Typography sx={{ mt:3, mb:2 }} color='secondary'>
                                Add Image
                            </Typography>
                            <input type="file" accept="image/*" name="" id="" onChange={(e) => setImage(e.target.files[0])}/>
                            {imgPerc > 0 && imgPerc < 100 ? <Box sx={{ mt:2, display:'flex' }}>
                                <div style={{ width: 50, height: 50 }}>
                                    <CircularProgressbar  value={imgPerc} text={`${imgPerc}`} />
                                </div>
                                
                                <Typography color='primary' variant='body2' sx={{ mt:2, ml:2 }}>
                                    Uploading Video. Please wait...
                                </Typography>
                            </Box> : <Box></Box>}
                        </Box>

                        <Box>
                            <Typography sx={{ mt:3, mb:3 }} color='secondary'>
                                Add Video
                            </Typography>
                            <input type="file" accept="video/*" name="" id="" onChange={(e) => setVideo(e.target.files[0])} />
                            {videoPerc > 0 && videoPerc < 100 ? <Box sx={{ mt:2, display:'flex' }}>
                                <div style={{ width: 50, height: 50 }}>
                                    <CircularProgressbar  value={videoPerc} text={`${videoPerc}`} />
                                </div>
                                
                                <Typography color='primary' variant='body2' sx={{ mt:2, ml:2 }}>
                                    Uploading Video. Please wait...
                                </Typography>
                            </Box> : <Box></Box>}
                        </Box>
                    </Box>
                </Box>
                

                <Box sx={{ mb:4, mt:2, display:'flex', justifyContent:'center' }}>
                    {inputs === '' || videoPerc !== 100 || imgPerc !== 100 ? <Button disabled variant='contained' color='success' size='large' sx={{ width:{md:'50%', sm:'50%', xs:'70%'}}} onClick={handleUpload}>
                        Upload Video
                    </Button> : <Button variant='contained' color='success' size='large' sx={{ width:{md:'50%', sm:'50%', xs:'70%'}}} onClick={handleUpload}>
                        Upload Video
                    </Button>}
                </Box>
                
            </Card>
            
        </Box>
    </Container>
    
  )
}

export default UploadVideoContent
