import { Button, Container, Box, Link } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import moment from "moment"
export default function ExpensePremium(){
    const [isPreviousDownloadOpen,setPreviousDownloadState] = useState(false)
    const [downloads,setDownload] = useState([])
    async function handleDownload(){
      try{
        const token=localStorage.getItem('auth_token');
        const data = await axios.get('http://localhost:8006/expenses/download',{headers:{"Authorization":token}});
        if(data.status===200){
        var a = document.createElement('a');
        a.href=data.data.fileUrl;
        a.download='myexpense.csv';
        a.click();
        }
        else{
          alert("Try Downloading Again!!")
        }
      }
      catch(e){
        alert("Cannot Download Expense")
      }
      
    }
    async function handleShowDownload(){
      if(!isPreviousDownloadOpen){
        try{
          const token = localStorage.getItem('auth_token')
          const res = await axios.get('http://localhost:8006/expenses/get-downloads',{headers:{"Authorization":token}})
          setDownload([...res.data.allDownloads.downloads])
          setPreviousDownloadState(true)
        }
        catch(e){
          console.log("error in getting downloads")
        }

      }
      else{
        setPreviousDownloadState(false)
      }
    }
    return(
    <Container
    sx={{
        height: "auto",
        width: "90vh",
        mt: 2,
        borderRadius: 2
      }}
    >
        <Box sx={{ display:'flex',justifyContent:'flex-end'}}>
        <Button color="secondary" variant="contained" size="medium" onClick={handleDownload}>Download Expense</Button>
        <Button color="inherit" variant="contained" size="medium" sx={{ml:2}}
         onClick={handleShowDownload}>
        {isPreviousDownloadOpen? 'Close Downloads':'Show Downloads' }
        </Button>
        </Box>
        {isPreviousDownloadOpen?
        <Box 
        sx={{
            height: "auto",
            width: "80vh",
            mt: 2,
            px:2,
            py:1,
            backgroundColor:'white',
            borderRadius: 2,
            display:'flex',
            flexDirection:'column'
          }}
        >
        {downloads.map((download,i)=>{
           return <Link href={download.fileUrl} sx={{fontSize:20,mb:1}} key={download._id}>
            {moment(download.downloadDate).format("MMM, DD hh:mm a")}
            </Link>
        })}
        </Box>
        :
        null
    }
    </Container>
    )
}