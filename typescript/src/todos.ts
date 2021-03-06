import { Request, Response, Router } from "express";
import { TodosController } from "./todos.controller";
import { TodoService } from "./todos.service";

export function createRouter(service: TodoService) {
  const controller = new TodosController(service);
  const router = Router();

  router.get("/", (req: Request, res: Response) => controller.index(req, res));
  router.get("/:id", (req: Request, res: Response) => controller.get(req, res));
  router.post("/",
    controller.validateTodoCreate,
    (req: Request, res: Response) => controller.create(req, res)
  );
  router.put("/:id",
    controller.validateTodoTitleUpdate,
    controller.validateTodoDoneUpdate,
    (req: Request, res: Response) => controller.update(req, res)
  );
  router.delete(
    "/:id",
    (req: Request, res: Response) => controller.destroy(req, res)
  );

  return router;
}
