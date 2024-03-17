package site.gongnomok.enhanceditem.exception;

public class CannotFindCategoryException extends RuntimeException {

    public CannotFindCategoryException() {
        super();
    }

    public CannotFindCategoryException(String message) {
        super(message);
    }

    public CannotFindCategoryException(String message, Throwable cause) {
        super(message, cause);
    }

    public CannotFindCategoryException(Throwable cause) {
        super(cause);
    }

    protected CannotFindCategoryException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
