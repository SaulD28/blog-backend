import Comment from "../comment/comment.model.js";
import Post from "../post/post.model.js"; 

export const createComment = async (req, res) => {
    try {
        const { text, postId, user } = req.body; 


        const postExists = await Post.findById(postId);
        if (!postExists) {
            return res.status(404).json({
                success: false,
                message: "Post no encontrado",
            });
        }

        const comment = new Comment({ description: text, post: postId, user });
        const saveComment = await comment.save();

        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: saveComment._id } },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            msg: `Comentario creado exitosamente`,
            comment: saveComment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear el comentario",
            error: error.message,
        });
    }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId, status: true }) // si usás status
      .sort({ date: -1 }); // ordenados por fecha descendente

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los comentarios',
      error: error.message,
    });
  }
};


export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;


        const commentDelete = await Comment.findByIdAndUpdate(
            id,
            { status: false }, 
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado",
            comment: commentDelete,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: error.message,
        });
    }
};
