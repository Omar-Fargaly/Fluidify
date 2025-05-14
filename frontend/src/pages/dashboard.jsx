import TaskList from "../components/tasks/taskList";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../libs/api/tasks';
import 'swiper/css';
import 'swiper/css/pagination';

function Dashboard() {
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error fetching tasks: {error.message}</div>;
  console.log(tasks);
  return (
    <>
      <div className="grid-cols-1 md:grid-cols-2 gap-8 items-start justify-center hidden xl:grid">
        <div className="flex justify-end w-full">
          <TaskList tasks={tasks.data} />
        </div>
        <div className="flex justify-start w-full">
          <TaskList completed tasks={tasks.data} />
        </div>
      </div>
      <div className="xl:hidden block w-full relative">
        <Swiper spaceBetween={20} slidesPerView={1}>
          <SwiperSlide>
            <TaskList tasks={tasks.data} />
          </SwiperSlide>
          <SwiperSlide>
            <TaskList completed tasks={tasks.data} />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default Dashboard;
