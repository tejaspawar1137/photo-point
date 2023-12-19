import connectToDB from './api/Db' 
import HomePage from "@/app/components/Home/page" 
import NavBar from './components/Navbar/page'; 
// import DropboxUpload from './components/Dropbox';
export default function Home() {
  connectToDB();
  return (
<div className='bg-white h-[100vh]'>
 <HomePage/>
</div>
  )
}
