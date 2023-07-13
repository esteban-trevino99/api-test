import { describe, expect, it } from '@jest/globals';

import { getMockReq, getMockRes } from '@jest-mock/express'

import PostController from "../post.controller";
import axios from "axios";

jest.mock("axios");
jest.mock('../../config/database', () => jest.fn().mockImplementation(() => {
    return { query: jest.fn((_req, _res, callback)=>{
        callback()
    }) };
}))

describe("Auth Controller test", () => {
    it('api should have been called', async () => {
        const req = getMockReq()
        const { res } = getMockRes();

        (axios.get as jest.Mock).mockResolvedValue({ data: [{ id: 123 }] });

        new PostController(req, res).create()
        expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts");
    })
    it('class should have create, get and delete', () =>{
        expect("get" in PostController.prototype).toBe(true)
        expect("create" in PostController.prototype).toBe(true)
        expect("delete" in PostController.prototype).toBe(true)
    })
})