import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import { validationResult } from 'express-validator';
import { PostCreate } from '../interfaces/Post';

/**
 * get post service.
 * @param _req 
 * @param res 
 * @param next 
 */
export const getPostService = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    let condition: any = { deleted_at: null };

    const posts = await Post.find(condition);
    res.json({ data: posts, status: 1 });
  } catch (err: any) {
    console.log('err', err);
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

/**
 * create post service
 * @param req 
 * @param res 
 * @param next 
 */
export const createPostService = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const postInsert: PostCreate = {
      title: req.body.title,
      description: req.body.description
    }
    const post = new Post(postInsert);
    const result = await post.save();
    res
      .status(201)
      .json({ message: "Created Successfully!", data: result, status: 1 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

/**
 * get post data with postId service.
 * @param req 
 * @param res 
 * @param _next 
 */
export const findPostService = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error: any = Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    res.json({ data: post, status: 1 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res
      .status(404)
      .json({ message: "Post not found!", status: 0 });
  }
}

/**
 * update post with id.
 * @param req 
 * @param res 
 * @param _next 
 */
export const updatePostService = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const post: any = await Post.findById(req.params.id);
    if (!post) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    post.title = req.body.title;
    post.description = req.body.description;
    const result = await post.save();
    res.json({ message: "Updated Successfully!", data: result, status: 1 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

/**
 * delete post with id.
 * @param req
 * @param res 
 * @param _next 
 */
export const deletePostService = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    const post: any = await Post.findById(req.params.id);
    if (!post) {
      const error: any = new Error("Not Found!");
      error.statusCode = 404;
      throw error;
    }
    post.deleted_at = new Date();
    await post.save();
    res.json({ message: "Deleted Successfully!", status: 1 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

/**
 * find title with keyword service.
 * @param req 
 * @param res 
 * @param _next 
 */
export const findByNameService = async (
  req: any,
  res: Response,
  _next: NextFunction
) => {
  try {
    let condition: any = { title: { '$regex': req.body.title, '$options': 'i' }, deleted_at: null };
    const posts = await Post.find(condition);
    res.json({ data: posts, status: 1 });
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
}