import {describe, test, expect, beforeAll, afterAll} from '@jest/globals'
import { waitForPageLoad } from './wait-for-page-load';

describe('waitForPageLoad', () => {
  test('should return a promise that resolves to null when the page is fully loaded', async () => {
    // Dummy pageLoaded implementation that returns a resolved promise
    const pageLoaded = jest.fn().mockResolvedValue(null);
    
    await expect(waitForPageLoad()).resolves.toBeNull();
    expect(pageLoaded).toHaveBeenCalledTimes(1);
  });

  test('should return a promise that resolves to null after waiting for a specific timeout when provided', async () => {
    // Mocked wait function that returns a resolved promise after the specified timeout
    const wait = jest.fn().mockResolvedValue(undefined);
    // Dummy pageLoaded implementation that returns a resolved promise
    const pageLoaded = jest.fn().mockResolvedValue(null);
    const timeout = 5000;

    await expect(waitForPageLoad(timeout)).resolves.toBeNull();
    expect(pageLoaded).toHaveBeenCalledTimes(1);
    expect(wait).toHaveBeenCalledWith(timeout);
  });

  test('should return a promise that rejects if the page is not fully loaded within the specified timeout', async () => {
    // Mocked wait function that returns a resolved promise after the specified timeout
    const wait = jest.fn().mockResolvedValue(undefined);
    // Dummy pageLoaded implementation that returns an unresolved promise
    const pageLoaded = jest.fn();
    const timeout = 5000;

    await expect(waitForPageLoad(timeout)).rejects.toBeDefined();
    expect(pageLoaded).toHaveBeenCalledTimes(0);
    expect(wait).toHaveBeenCalledWith(timeout);
  });
});