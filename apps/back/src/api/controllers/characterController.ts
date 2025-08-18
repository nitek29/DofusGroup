import status from "http-status";
import { NextFunction, Request, Response } from "express";

import {
  Character,
  CharacterBodyData,
  CharacterEnriched,
} from "../../types/character.js";
import { CharacterRepository } from "../../middlewares/repository/characterRepository.js";
import { AuthenticatedRequest } from "../../middlewares/utils/authService.js";

export class CharacterController {
  private repository: CharacterRepository;

  public constructor(repository: CharacterRepository) {
    this.repository = repository;
  }

  public async getAllByUserId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId: string = req.params.userId;

    try {
       if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }
      const characters: Character[] =
        await this.repository.getAllByUserId(userId);

      if (!characters.length) {
        res.status(status.NO_CONTENT).json({ error: "Any character found" });
        return;
      }

      res.json(characters);
    } catch (error) {
      next(error);
    }
  }

  public async getAllEnrichedByUserId(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const userId: string = req.params.userId;

    try {

       if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }
      const characters: CharacterEnriched[] =
        await this.repository.getAllEnrichedByUserId(userId);

      if (!characters.length) {
        res.status(status.NO_CONTENT).json({ error: "Any character found" });
        return;
      }
      res.json(characters);
    } catch (error) {
      next(error);
    }
  }

  public async getOneByUserId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId, characterId } = req.params;

    try {
       if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }

      const character: Character | null = await this.repository.getOneByUserId(
        userId,
        characterId,
      );

      if (!character) {
        res.status(status.NOT_FOUND).json({ error: "Character not found" });
        return;
      }

      res.json(character);
    } catch (error) {
      next(error);
    }
  }

  public async getOneEnrichedByUserId(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { userId, characterId } = req.params;

    try {
       if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }

      const character: CharacterEnriched | null =
        await this.repository.getOneEnrichedByUserId(userId, characterId);

      if (!character) {
        res.status(status.NOT_FOUND).json({ error: "Character not found" });
        return;
      }

      res.json(character);
    } catch (error) {
      next(error);
    }
  }

  // public async post(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     if (!req.params.userId) {
  //       res.status(status.BAD_REQUEST).json({ error: "User ID is required" });
  //       return;
  //     }

  //     const userId: string = req.params.userId;
  //     const characterData: CharacterBodyData = { ...req.body, user_id: userId };

  //     const newCharacter = await this.repository.post(characterData);

  //     const newCharacterEnriched = await this.repository.getOneEnrichedByUserId(
  //       userId,
  //       newCharacter.id,
  //     );

  //     res.status(status.CREATED).json(newCharacterEnriched);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // public async updateOld(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     if (!req.params.userId) {
  //       res.status(status.BAD_REQUEST).json({ error: "User ID is required" });
  //       return;
  //     }

  //     const { userId, characterId } = req.params;
  //     const characterData: Partial<CharacterBodyData> = req.body;

  //     const characterUpdated: Character | null = await this.repository.update(
  //       userId,
  //       characterId,
  //       characterData,
  //     );

  //     if (!characterUpdated) {
  //       res.status(status.NOT_FOUND).json({ error: "Character not found" });
  //       return;
  //     }

  //     const characterUpdatedEnriched =
  //       await this.repository.getOneEnrichedByUserId(
  //         userId,
  //         characterUpdated.id,
  //       );

  //     res.json(characterUpdatedEnriched);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // public async deleteOld(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     if (!req.params.userId) {
  //       res.status(status.BAD_REQUEST).json({ error: "User ID is required" });
  //       return;
  //     }

  //     const { userId, characterId } = req.params;

  //     const result: boolean = await this.repository.delete(userId, characterId);

  //     if (!result) {
  //       res.status(status.NOT_FOUND).json({ error: "Character not found" });
  //       return;
  //     }

  //     res.status(status.NO_CONTENT).end();
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // Nouvelles méthodes sécurisées avec JWT
  public async getUserCharacters(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }

      const characters: Character[] = await this.repository.getAllByUserId(req.userId);

      if (!characters.length) {
        res.status(status.NO_CONTENT).json({ error: "Any character found" });
        return;
      }

      res.json(characters);
    } catch (error) {
      next(error);
    }
  }

  public async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }

      const characterData: CharacterBodyData = {
        ...req.body,
        user_id: req.userId,
      };

      const newCharacter: Character = await this.repository.post(characterData);
      const newCharacterEnriched: CharacterEnriched | null = await this.repository.getOneEnrichedByUserId(
        req.userId,
        newCharacter.id,
      );

      res.status(status.CREATED).json(newCharacterEnriched);
    } catch (error) {
      next(error);
    }
  }

  public async update(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }

      const { characterId } = req.params;
      const updateData: Partial<CharacterBodyData> = req.body;

      const updatedCharacter: Character | null = await this.repository.update(req.userId, characterId, updateData);

      if (!updatedCharacter) {
        res.status(status.NOT_FOUND).json({ error: "Character not found" });
        return;
      }

      res.json(updatedCharacter);
    } catch (error) {
      next(error);
    }
  }

  public async delete(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.userId) {
        res.status(status.FORBIDDEN).json({ error: "Forbidden access" });
        return;
      }

      const { characterId } = req.params;

      const result: boolean = await this.repository.delete(req.userId, characterId);

      if (!result) {
        res.status(status.NOT_FOUND).json({ error: "Character not found" });
        return;
      }

      res.status(status.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }
}
