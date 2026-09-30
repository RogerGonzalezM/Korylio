import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppController } from './app.controller.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return an OK status', () => {
      expect(appController.getHealth()).toEqual({
        status: 'ok',
      });
    });
  });
});