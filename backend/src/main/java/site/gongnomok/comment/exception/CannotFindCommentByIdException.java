package site.gongnomok.comment.exception;


public class CannotFindCommentByIdException extends RuntimeException {

    public CannotFindCommentByIdException() {
        super();
    }

    public CannotFindCommentByIdException(String message) {
        super(message);
    }

    public CannotFindCommentByIdException(Long commentId) {
        this("cannot find comment by comment id=[" + commentId + "]");
    }

    public CannotFindCommentByIdException(String message, Throwable cause) {
        super(message, cause);
    }

    public CannotFindCommentByIdException(Throwable cause) {
        super(cause);
    }

    protected CannotFindCommentByIdException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
