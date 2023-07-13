import BaseController from "./base.controller";
import Database from "../config/database";
import axios from 'axios'

class PostController extends BaseController {
    create() {
        const db = new Database(true);
        axios.get('https://jsonplaceholder.typicode.com/posts').then((result: any) => {
            const data = result.data.map((item: {
                userId: number,
                id: number,
                title: string,
                body: string
            }) => [item.userId, item.id, item.title, item.body]);

            db.query("INSERT INTO posts (user_id, id, title, body) VALUES ?;", [data], () => {
                axios.get('https://jsonplaceholder.typicode.com/comments').then((result: any) => {
                    const data = result.data.map((item: {
                        postId: number,
                        id: number,
                        name: string,
                        email: string
                        body: string
                    }) => [item.postId, item.id, item.name, item.email, item.body]);

                    const db = new Database(true);
                    db.query("INSERT INTO post_comments (post_id, id, name, email, body) VALUES ?;", [data], () => {
                        this.res.send({ check: true })
                    })
                })
            })
        })
    }
    get() {
        const { id } = this.req.query;
        const db = new Database(true);
        db.query(`
            SELECT 
                p.id as postId, 
                p.user_id as userId, 
                p.title as postTitle, 
                p.body as postBody,
                pc.id as commentId,
                pc.name as commentName,
                pc.email as commentEmail,
                pc.body as commentBody
            FROM posts p
            JOIN post_comments pc on p.id = pc.post_id;
        `, [id], (result: any) => {
            const data = [...new Set(result.map((post: any) => JSON.stringify({
                id: post.postId,
                userId: post.userId,
                title: post.postTitle,
                body: post.postBody,
                comments: [...new Set(result.filter((comment: any) => comment.postId === post.postId)
                    .map((comment: any) => JSON.stringify({
                        id: comment.commentId,
                        name: comment.commentName,
                        email: comment.commentEmail,
                        body: comment.commentBody
                    })))
                ].map((item: any) => JSON.parse(item))
            })))].map((item: any) => JSON.parse(item))
            this.res.send(data)
        })
    }
    delete() {
        const db = new Database(true);
        db.query(`DELETE FROM post_comments`, [], () => {
            db.query(`DELETE FROM posts`, [], () => {
                this.res.send({ check: true })
            })
        })
    }
}

export default PostController