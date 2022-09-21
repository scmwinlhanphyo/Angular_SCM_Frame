/**
 * Post model.
 * 
 * @export
 * @class Post
 */
 export class Post {
  title: string;
  description: string;
  created_user: string;
  created_at: string;

  /**
   * constructor()
   * 
   * Constructor for Post
   */
  constructor() {
      this.title = "";
      this.description = "";
      this.created_user = "";
      this.created_at = "";
  }
}