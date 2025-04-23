import HomeNav from "../components/home/HomeNav";
import HomeTasks from "../components/home/HomeTasks";

function Home() {
    return ( 
        <>
        <div className="container mx-auto space-y-4">
            <HomeNav />
            <HomeTasks />
        </div>
        </>
     );
}

export default Home;