import { Body, Controller, Post } from "@nestjs/common";
import { TaskService } from "./task.service";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() taskData: { title: string }) {
    return taskData;
  }
}
