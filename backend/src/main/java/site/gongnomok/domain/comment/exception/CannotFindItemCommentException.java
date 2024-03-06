package site.gongnomok.domain.comment.exception;

public class CannotFindItemCommentException extends RuntimeException {
    public CannotFindItemCommentException() {
        super();
    }

    public CannotFindItemCommentException(String message) {
        super(message);
    }

    public CannotFindItemCommentException(Long id) {
        this("cannot find comment of item id = [" + id + "]");
    }

    public CannotFindItemCommentException(String message, Throwable cause) {
        super(message, cause);
    }

    public CannotFindItemCommentException(Throwable cause) {
        super(cause);
    }

    protected CannotFindItemCommentException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
