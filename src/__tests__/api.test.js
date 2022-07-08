'use strict';
import { fetchData } from '../api/api';

test('isFetchData', async () => {
     const response = await fetchData(1);
     expect(response).toBeDefined();
});

test('isStatus200', async () => {
     const response = await fetchData(1);
     expect(response.status).toBe(200)
});

test('isResponseObject', async () => {
     const response = await fetchData(1);
     expect(response.data).toBeInstanceOf(Object);
});

test('isResponseObjectHasProperty', async() => {
     const response = await fetchData(1);
     expect(response.data).toEqual(expect.objectContaining({
          data: {sentence: expect.any(String)}
     }))
})
