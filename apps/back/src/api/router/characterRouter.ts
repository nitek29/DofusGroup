import { Router } from "express";

import validateUUID from "../../middlewares/utils/validateUUID.js";
import htmlSanitizer from "../../middlewares/utils/htmlSanitizer.js";
import validateSchema from "../../middlewares/joi/validateSchema.js";
import { AuthService } from "../../middlewares/utils/authService.js";
import { CharacterController } from "../controllers/characterController.js";
import {
  createCharacterSchema,
  updateCharacterSchema,
} from "../../middlewares/joi/schemas/character.js";

export function createCharacterRouter(
  controller: CharacterController,
  authService: AuthService,
): Router {
  const router: Router = Router();

  router.get("/user/:userId/characters", 
    authService.setAuthUserRequest, 
    validateUUID, 
    (req, res, next) => {
    controller.getAllByUserId(req, res, next);
  });

  router.get(
    "/user/:userId/characters/enriched", 
    authService.setAuthUserRequest,
    validateUUID,
    (req, res, next) => {
      controller.getAllEnrichedByUserId(req, res, next);
    },
  );

  router
    .route("/user/:userId/character/:characterId")
    .get(authService.setAuthUserRequest, 
      validateUUID, 
      (req, res, next) => {
      controller.getOneByUserId(req, res, next);
    });

  router.get(
    "/user/:userId/character/:characterId/enriched",
    authService.setAuthUserRequest,
    validateUUID,
    (req, res, next) => {
      controller.getOneEnrichedByUserId(req, res, next);
    },
  );

  router.get(
    "/characters",
    authService.setAuthUserRequest,
    (req, res, next) => {
      controller.getUserCharacters(req, res, next);
    },
  );

  router.post(
    "/characters",
    authService.setAuthUserRequest,
    htmlSanitizer,
    validateSchema(createCharacterSchema),
    (req, res, next) => {
      controller.create(req, res, next);
    },
  );

  router
    .route("/character/:characterId")
    .patch(
      validateUUID,
      authService.setAuthUserRequest,
      htmlSanitizer,
      validateSchema(updateCharacterSchema),
      (req, res, next) => {
        controller.update(req, res, next);
      },
    )
    .delete(
      validateUUID,
      authService.setAuthUserRequest,
      (req, res, next) => {
        controller.delete(req, res, next);
      },
    );

  return router;
}
