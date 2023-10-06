'use client';
import { Button } from 'components/ui/button';
import TaskListPage from 'components/task-List';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/addTask`);
  };
  return (
    <>
      <Button onClick={() => handleClick()}>Add Task Page</Button>
      <TaskListPage />
    </>
  );
}
