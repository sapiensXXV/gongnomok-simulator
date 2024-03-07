package site.gongnomok.domain.comment.exception;

public class CommentPasswordNotMatchException extends RuntimeException {
    public CommentPasswordNotMatchException() {
        super();
    }

    public CommentPasswordNotMatchException(String message) {
        super(message);
    }

    public CommentPasswordNotMatchException(String message, Throwable cause) {
        super(message, cause);
    }

    public CommentPasswordNotMatchException(Throwable cause) {
        super(cause);
    }

    protected CommentPasswordNotMatchException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
