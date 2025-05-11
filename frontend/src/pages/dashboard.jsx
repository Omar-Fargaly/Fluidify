import TaskList from "../components/tasks/taskList";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules'; // Use "modules" in newer Swiper versions
import 'swiper/css';
import 'swiper/css/pagination';

function Dashboard() {
  return (
    <>
      <div className="grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center hidden xl:grid">
        <div className="flex justify-end w-full">
          <TaskList />
        </div>
        <div className="flex justify-start w-full">
          <TaskList />
        </div>
      </div>
      <div className="xl:hidden block w-full relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <TaskList />
          </SwiperSlide>
          <SwiperSlide>
            <TaskList />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default Dashboard;
