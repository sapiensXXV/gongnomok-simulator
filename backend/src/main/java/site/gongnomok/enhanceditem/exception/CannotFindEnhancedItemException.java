package site.gongnomok.enhanceditem.exception;

public class CannotFindEnhancedItemException extends RuntimeException{

    public CannotFindEnhancedItemException() {
        super();
    }

    public CannotFindEnhancedItemException(String message) {
        super(message);
    }

    public CannotFindEnhancedItemException(String message, Throwable cause) {
        super(message, cause);
    }

    public CannotFindEnhancedItemException(Throwable cause) {
        super(cause);
    }

    protected CannotFindEnhancedItemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
